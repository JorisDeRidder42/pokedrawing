import { Component, OnInit, ViewChild } from '@angular/core';
import { ApicallService } from 'src/app/services/apicall.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage {
  offset = 0;
  pokemon = [];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private apiccall: ApicallService) { }

  ngOnInit(){
    this.loadPokemon();
  }
  loadPokemon(loadMore=false, event?){
    if(loadMore){
      this.offset += 25;
    }

    this.apiccall.getPokemon(this.offset).subscribe(res => {
        this.pokemon=[...this.pokemon, ...res]
      if (event) {
        event.target.complete();
      }

      if (this.offset == 125) {
        this.infinite.disabled = true;
      }
    })
  }
  onSearchChange(e){
    let value = e.detail.value;

    if (value = '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.apiccall.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    })
  }
}
