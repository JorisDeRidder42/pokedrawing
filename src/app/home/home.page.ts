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
  indexnummerpokemon: number;
  
  ngOnInit(){
    this.LoadImagePokemon();
  }
  
  async LoadImagePokemon(){
    this.afbeelding = this.apiService.getPokeImage(this.apiService.CreateRandomIndex());
  }
}
