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
  searchText = '';
  pokemons: any[] = [];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(private apiccall: ApicallService) { }
  ngOnInit(){
    this.loadPokemon();
  }
  loadPokemon(loadMore=false, event?){
    //als loadmore == true dan + 25 geladen
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
  async searchChangeHandler(event: any): Promise<void> {
    this.searchText = event.target.value;
    await this.loadPokemon(true);
  }
}
