import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { AlertController, Platform, ModalController, ToastController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApicallService } from 'src/app/services/apicall.service';
import { HttpClient } from '@angular/common/http';

import { FileSharer } from '@byteowls/capacitor-filesharer';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.page.html',
  styleUrls: ['./draw.page.scss'],
})
export class DrawPage implements AfterViewInit{
  @ViewChild('myCanvas', {static: false}) canvas: any;
  canvasElement: any;
  //de punten waar de user tekent
  PositionX: number;
  PositionY: number;
  drawing = false;
  sliceSize:number;

  selectedColor: string = '#459cde';
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3', '#ffffff' ];
  lineWidth: number = 10;
  afbeelding: string;
  indexnummerpokemon: number;
  restoreArray = [];
  indexArray :number = -1;
  dataUrl:string;

  constructor(public platform: Platform,
               public renderer: Renderer2,
               public alertController: AlertController,
               public apiService: ApicallService,
  //             public base64ToGallery: Base64ToGallery,
               public toastCtrl: ToastController,
         public commonModule: CommonModule) {
                }
  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.platform.width() + '';
    this.canvasElement.height = 600;
    this.LoadImagePokemon();
  }
  //laad pokemonimage via random index
  async LoadImagePokemon(){
  let b = localStorage.getItem("indexpokemon");
  this.afbeelding = this.apiService.getPokeImage(b);
  }

  async shareDrawing(){
    this.dataUrl = this.canvasElement.toDataURL();
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    console.log(this.dataUrl);
    let base64 = this.dataUrl.split(',')[1];
    console.log(base64);
    
        await FileSharer.share({
          filename: Math.random() +'drawing.png',
            base64Data: base64,
            contentType: 'image/png'
          }).then(() => {
            let ctx = this.canvasElement.getContext('2d');
            ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }).catch(error => {
            console.error("File sharing failed:", error.message);
        });
  }

  startDrawing(event){
    this.drawing = true;
    let canvasPositie = this.canvasElement.getBoundingClientRect();

    this.PositionX = event.pageX - canvasPositie.x;
    this.PositionY = event.pageY - canvasPositie.y;
    //console.log(this.PositionX, this.PositionY);
  }

  moved(event){
    //Browser support
    if (!this.drawing) return
    const canvasPositie = this.canvasElement.getBoundingClientRect();
    let currentX = event.pageX - canvasPositie.x;
    let currentY = event.pageY - canvasPositie.y;
    this.teken(currentX, currentY)

  }

  handleMoved(event){
    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;
    this.teken(currentX, currentY)
  }

  endDrawing(){
    this.drawing = false;
    let ctx = this.canvasElement.getContext('2d');
    this.restoreArray.push(ctx.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height));
    this.indexArray += 1;
    //console.log(this.restoreArray);
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      header: 'Clear canvas',
      message: 'Do you want to <strong>clear the canvas</strong> and start over?',
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
          }
        }, 
        {
          text: 'Okay',
          handler: () => {
              this.clearCanvas();
            }
        }
      ]
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  selectColor(color){
    this.selectedColor = color;
    //console.log(color);
  }

  changeSize(size){
    this.lineWidth = size
  }

  teken(currentX, currentY){
    let ctx = this.canvasElement.getContext('2d');
    //lijn is afgerond
    ctx.lineJoin = "round";
    //breedte van de lijn
    ctx.lineWidth = this.lineWidth;
    //kleur van de lijn
    ctx.strokeStyle = this.selectedColor;
    //Start het tekennen
    ctx.beginPath();
    //Beweeg van posities
    ctx.moveTo(this.PositionX, this.PositionY);
    //maak een lijn van ...
    ctx.lineTo(currentX, currentY);
    //sluit een pad
    ctx.closePath();
    //teken de stroke
    ctx.stroke();
       
    //onthoud positie X en Y
      this.PositionX = currentX;
      this.PositionY = currentY;
  }
  //maak canvas leeg
  clearCanvas(){
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    //Restore the array length
    this.restoreArray = [];
    this.indexArray -= 1;
  }

  uploadToStorage(){
    let dataUrl = this.canvasElement.toDataURL();
    console.log('drawing: ',dataUrl);

    //clearcanvas
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    // if(this.platform.is('cordova')){

    // const options: Base64ToGalleryOptions = { prefix: 'canvas', mediaScanner: true};

    // // this.base64ToGallery.base64ToGallery(dataUrl, { prefix: '_img' }).then(
    // //   res => console.log('Saved image to gallery ', res),
    // //   err => console.log('Error saving image to gallery ', err)

    //   this.base64ToGallery.base64ToGallery(dataUrl, options).then(
    //     async res => {
    //       const toast = await this.toastCtrl.create({
    //         message: 'Image saved to camera roll.',
    //         duration: 2000
    //       });
    //       toast.present();
    //       let ctx = this.canvasElement.getContext('2d');
    //       ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    //       console.log(dataUrl);
    //     },
    //     err => console.log('Error saving image to gallery ', err)
    //   );
    // }
    // else{
    //   let data = dataUrl.split(',')[1];
    //   let blob = this.b64toBlob(data,'image/png');

    //   var a = window.document.createElement('a');
    //   a.href= window.URL.createObjectURL(blob);
    //   a.download= 'canvasimage.png';
    //   document.body.appendChild(a);
    //     a.click()
    //     document.body.removeChild(a);
    // }
  }

  // https://forum.ionicframework.com/t/save-base64-encoded-image-to-specific-filepath/96180/3
    b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
  
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      var byteArray = new Uint8Array(byteNumbers);
  
      byteArrays.push(byteArray);
    }
  
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  undoLast(){
    if (this.indexArray <= 0) {
      this.clearCanvas();
    }
    else{
      this.indexArray -= 1;
      this.restoreArray.pop();
      let ctx = this.canvasElement.getContext('2d');
      ctx.putImageData(this.restoreArray[this.indexArray], 0, 0);
      console.log('1',this.indexArray);
    }
  }
  
}
