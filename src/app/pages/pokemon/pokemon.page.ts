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
  name: any;
  headerVisible: boolean = false;
  pokemon = [];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(public apicall: ApicallService) { }
  ngOnInit(){
    this.loadPokemon();
  }
  //https://devdactic.com/ionic-4-pokedex-search-scroll/
  loadPokemon(loadMore=false, event?){
    //als loadmore wordt opgeroepen dan + 25 pokemon geladen
    if(loadMore){
      this.offset += 25;
    }

    //roept the apicall op voor pokemon en toont deze in een array
    this.apicall.getPokemon(this.offset)
    .subscribe((res: any) => {
        //console.log(this.pokemon=[...this.pokemon, ...res]);
        this.pokemon=[...this.pokemon, ...res];

      if (event) {
        event.target.complete();
      }
      //optioneel maar zorgt ervoor dat de infinite scroll niet verder kan dan 150
      if (this.offset == 125) {
        this.infinite.disabled = true;
      }
    })
  }
//zoekt pokemon doormiddel van naam en id
  async searchPokemon(event: any): Promise<void> {
    this.searchText = event.target.value;
    let value = event.detail.value;
    if (value == '' || this.searchText == '') {
      this.offset = 0;
      await this.resetPokemon();
    }
    this.apicall.findPokemon(value).subscribe(res =>{
      this.pokemon = [res];
    }, err => {
      this.resetPokemon();
      console.log(err);
    });
  }

  private async resetPokemon(reset = false): Promise<void> {
    if (reset) {
      this.offset = 0;
    }
  }
}
