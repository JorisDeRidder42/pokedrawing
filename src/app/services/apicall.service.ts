import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  maxGen1: number = 151;
  minGen1: number = 1;

  baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  imageShinyUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(public http: HttpClient) { }

  CreateRandomIndex(){
    return Math.floor(Math.random() * this.maxGen1) + this.minGen1
  }

  getPokeImage(index){
     return `${this.imageUrl}${index}.png`;
  }

  getPokemono(index){
    return `${this.baseUrl}${index}`;
  }
  getPokemon(offset = 0){
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=25`,{
      observe: 'body',
      responseType: 'json'
    }).pipe(
      map(result => {
        return result['results'];
      }),
      map(pokemons => {
        //for loop de pokemon index
        return pokemons.map((poke, index) => {
           poke.image = this.getPokeImage(index + offset + 1)
           poke.pokeIndex = offset + index + 1;
           return poke;
        });
      })
    )
  }

  findPokemon(search){
   return this.http.get(`${this.baseUrl}/pokemon/${search}`).pipe(
     map(pokemon => {
       pokemon['image'] = this.getPokeImage(pokemon['id']);
       pokemon['pokeIndex'] = pokemon['id'];
       return pokemon;
     })
   );
 }

 getPokeDetails(index){
   return this.http.get(`${this.baseUrl}/pokemon/${index}`).pipe(
     map(pokemon =>{
       let sprites = Object.keys(pokemon['sprites']);
       pokemon['images'] = sprites
       .map(spriteKey => pokemon['sprites'] [spriteKey])
       .filter(img => img);
       return pokemon
     })
   );
 }
}
