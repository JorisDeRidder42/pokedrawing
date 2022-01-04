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
  pokemons: any[] = [];
  pokemon:any;
  sprites:any[] = [];
  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  constructor(public apicall: ApicallService) { }
  ngOnInit(){
    this.loadPokemon();
  }
  
  loadPokemon(loadMore=false, event?){
    //als loadmore == true dan + 25 geladen
    if(loadMore){
      this.offset += 25;
    }

    this.apicall.getPokemon(this.offset)
    .subscribe((res: any) => {
        this.pokemons=[...this.pokemons, ...res];

      if (event) {
        event.target.complete();
      }

      if (this.offset == 125) {
        this.infinite.disabled = true;
      }
    })
  }

//  searchPokemon(event: any): Promise<void>{
//     let value = event.detail.value;
//     if (value == '') {
//       this.offset = 0;
//       this.loadPokemon(true);
//       return;
//     }
//     this.apicall.findPokemon(value).subscribe(res =>{
//       this.pokemon = [res];
//       }, err => {
//         this.pokemon = [];
//     });
//   }

  async searchPokemon(event: any): Promise<void> {
    this.searchText = event.target.value;
    await this.resetPokemon(true);
  }

  private async resetPokemon(reset = false): Promise<void> {
    if (reset) {
      this.offset = 0;
    }
  }
}
