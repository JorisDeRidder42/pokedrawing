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
  pokemons: any[] = [];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private apiccall: ApicallService) { }
  ngOnInit(){
    this.loadPokemon();
  }
  loadPokemon(loadMore=false, event?){
    //als laadmeer == true dan + 25 geladen
    if(loadMore){
      this.offset += 25;
    }

    this.apiccall.getPokemon(this.offset)
    .subscribe((res: any) => {
        this.pokemons=[...this.pokemons, ...res]
      if (event) {
        event.target.complete();
      }

      if (this.offset == 125) {
        this.infinite.disabled = true;
      }
    })
  }

  //zoeken
  onSearchChange(e){
    let value = e.detail.value;

    if (value = '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.apiccall.findPokemon(value).subscribe(res => {
      this.pokemons = [res];
    }, err => {
      this.pokemons = [];
    })
  }
}
