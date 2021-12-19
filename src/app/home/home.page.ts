import { Component } from '@angular/core';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public apiService: ApicallService) {}
  afbeelding: string;
  
  ngOnInit(index){
    this.LoadImagePokemon(index);
    //console.log('afbeeldingpad', this.afbeelding, this.pokenaam);
  }
  
  async LoadImagePokemon(index){
    this.afbeelding = this.apiService.getPokeImage(this.apiService.CreateRandomIndex());
  }
}
