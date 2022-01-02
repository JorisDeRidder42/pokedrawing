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
  
  ngOnInit(){
    this.LoadImagePokemon();
  }
  async LoadImagePokemon(){
    let b = localStorage.getItem("indexpokemon");
  this.afbeelding = this.apiService.getPokeImage(b);
  }

  randomPokemon(){
    this.afbeelding = this.apiService.getPokeImage(this.apiService.CreateRandomIndex());
  }

}
