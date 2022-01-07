import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from '../services/apicall.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public route: ActivatedRoute, private apiService :ApicallService,) {}
  afbeelding: string;
  nummerpokemon:number
  pokemon1: any;
  
  ngOnInit(){
    this.LoadImagePokemon();
  }
  
  async LoadImagePokemon(){
    //genereert random nummer van 1 - 151
    this.nummerpokemon = this.apiService.CreateRandomIndex();
    //toon afbeelding met de id van CreateRandomIndex
    this.afbeelding = this.apiService.getPokeImage(this.nummerpokemon);
    //haalt het object op met de id van hierboven zodat de naam kan getoond worden
    this.apiService.getPokemon1(this.nummerpokemon).subscribe(res => {
      this.pokemon1 = res;
    });
    //console.log(this.afbeelding)
    //console.log(this.nummerpokemon)
  }
}
