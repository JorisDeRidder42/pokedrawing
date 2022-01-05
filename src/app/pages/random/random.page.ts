import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomPage implements OnInit {

  constructor(public apiService: ApicallService) {}
  afbeelding: string;
  indexnummerpokemon: number;
  gekniptelink: string;
  pokemon1: any;
  
  ngOnInit(){
    this.LoadImagePokemon();
  }
  async LoadImagePokemon(){
    this.knipUrl();
  }

  randomPokemon(){
    this.afbeelding = this.apiService.getPokeImage(this.apiService.CreateRandomIndex());
    this.knipUrl();
  }

  knipUrl(){
  let b = localStorage.getItem("indexpokemon");
  this.afbeelding = this.apiService.getPokeImage(b);
  //console.log(this.afbeelding);
  this.gekniptelink = this.afbeelding.substring(this.afbeelding.lastIndexOf("/") + 1,this.afbeelding.lastIndexOf("."));
  this.getPokemonNameFromHome();
  }

  async getPokemonNameFromHome(){
    this.apiService.getPokemon1(this.gekniptelink).subscribe(res => {
      this.pokemon1 = res;
    }
  )};
}
