import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { AlertController,PopoverController, Platform} from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.page.html',
  styleUrls: ['./draw.page.scss'],
})
export class DrawPage implements AfterViewInit{
  @ViewChild('myCanvas') canvas: any;
  
  //de canvas API om te tekennen
  canvasElement: any;
  //de punten waar de user tekent
  PositionX: number;
  PositionY: number;
  //public photos: any;
  //base64Image: any;
  currentColor: string;
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
  drawing = false;
  lineWidth: number = 10;

  constructor(public platform: Platform,
               public renderer: Renderer2, 
               public alertController: AlertController,
               public colorpopoverController: PopoverController,
               public brushpopoverController: PopoverController,
               public commonModule: CommonModule) {
                }
  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
      //voor de volledige hoogte en breedte te nemen van het device
      this.renderer.setAttribute(this.canvasElement, 'width', this.platform.width() + '');
      this.renderer.setAttribute(this.canvasElement, 'height', this.platform.height() + '');         
  }
  startDrawing(event){
    this.drawing = true;
    //wanneer je het scherm aanraakt om te tekennen
    let canvasPositie = this.canvasElement.getBoundingClientRect();
    // console.log(canvasPositie);
    this.PositionX = event.pageX - canvasPositie.x;
    this.PositionY = event.pageY - canvasPositie.y;
    //console.log(this.PositionX, this.PositionY);
  }

  moved(event){
    //Browser support
    if (!this.drawing) return
    const canvasPositie = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');
    let currentX = event.pageX - canvasPositie.x;
    let currentY = event.pageY - canvasPositie.y;
    
    //console.log('start:' ,event);
    this.teken(currentX, currentY);
  }

  handleMoved(event){
    //Mobile support
    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;
        
      this.teken(currentX, currentY);
        //console.log('move mobile:' ,event);
  }

  endDrawing(){
    this.drawing = false;
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
            console.log('confirm cancel');
          }
        }, 
        {
          text: 'Okay',
          handler: () => {
            let ctx = this.canvasElement.getContext('2d');
              ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);  
            }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
  }

  changeColor(){

  }

  teken(currentX, currentY){
    //2d tekennen
    let ctx = this.canvasElement.getContext('2d');
    // de lijn is afgerond
    ctx.lineJoin = "round";
    //brushSize van de stroke
    ctx.lineWidth = this.lineWidth;
    ctx.currentColor = this.colors;
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

      this.PositionX = currentX;
      this.PositionY = currentY;
  }
}
