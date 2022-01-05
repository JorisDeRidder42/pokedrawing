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
  nummerpokemon:number
  moves:any;
  pokemon1: any;
  
  ngOnInit(){
    this.LoadImagePokemon();
  }
  
  async LoadImagePokemon(){
    this.nummerpokemon = this.apiService.CreateRandomIndex();
    this.afbeelding = this.apiService.getPokeImage(this.nummerpokemon);
    this.apiService.getPokemon1(this.nummerpokemon).subscribe(res => {
      this.pokemon1 = res;
    });
    //console.log(this.afbeelding)
    //console.log(this.nummerpokemon)
  }
}
