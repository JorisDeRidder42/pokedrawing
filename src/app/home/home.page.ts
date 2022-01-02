import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public route: ActivatedRoute, private apiService :ApicallService) {}
  afbeelding: string;
  name:any;
  
  ngOnInit(){
    this.LoadImagePokemon();
  }
  
  async LoadImagePokemon(){
    this.afbeelding = this.apiService.getPokeImage(this.apiService.CreateRandomIndex());
    // console.log(this.afbeelding)
  }
}
