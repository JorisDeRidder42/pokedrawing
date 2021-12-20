import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { AlertController,PopoverController, Platform} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ApicallService } from 'src/app/services/apicall.service';

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

  selectedColor: string = '#459cde';
  colors = [ '#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3' ];
  lineWidth: number = 10;
  afbeelding: string;
  indexnummerpokemon: number;

  constructor(public platform: Platform,
               public renderer: Renderer2, 
               public alertController: AlertController,
               public colorpopoverController: PopoverController,
               public brushpopoverController: PopoverController,
               public apiService: ApicallService,
               public commonModule: CommonModule) {
                }
  ngAfterViewInit(): void {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.platform.width() + '';
    this.canvasElement.height = 400;

    this.LoadImagePokemon();
    console.log('tekenafbeelding', this.afbeelding);
          
  }
  async LoadImagePokemon(){
    let b = localStorage.getItem("indexpokemon");
    this.afbeelding = this.apiService.getPokeImage(b);
    console.log(this.afbeelding);
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
    //Mobile support
    let currentX = event.touches[0].pageX;
    let currentY = event.touches[0].pageY;
    this.teken(currentX, currentY)
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

  selectColor(color){
    this.selectedColor = color;
    console.log(color);
  }

  changeSize(size){
    this.lineWidth = size
  }

  teken(currentX, currentY){
    let ctx = this.canvasElement.getContext('2d');
    ctx.lineJoin = "round";
    ctx.lineWidth = this.lineWidth;
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

      this.PositionX = currentX;
      this.PositionY = currentY;
  }
}
