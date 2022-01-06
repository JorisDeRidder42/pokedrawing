import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, retry} from 'rxjs/operators';
import { pokemon } from '../types/pokemon';
import { pokemonApiResult } from '../types/pokemonApiResult';

import {Capacitor} from '@capacitor/core';



@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  maxGen1: number = 151;
  minGen1: number = 1;
  indexnummerpokemon: any;

  drawing:any;


  baseUrl = 'https://pokeapi.co/api/v2/pokemon/';
  imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(public http: HttpClient) { }

  CreateRandomIndex(){
    let nummerpokemon = Math.floor(Math.random() * this.maxGen1) + this.minGen1
    localStorage.setItem("indexpokemon", nummerpokemon.toString());
    return nummerpokemon;
  }
  //ophalen image in pokemon tab
  getPokeImage(index){
     return `${this.imageUrl}${index}.png`;
  }
   getPokemon1(nummerpokemon){
    return this.http.get(`${this.baseUrl}${nummerpokemon}`)
 }
  //alle pokemon in de pokemon tab
  getPokemon(offset = 0, filter = ''): Observable <pokemonApiResult<pokemon>>{
    return this.http
    .get<pokemonApiResult<pokemon>>(
      `${this.baseUrl}?offset=${offset}&limit=25`,{
      observe: 'body',
      responseType: 'json',
      params: {
        offset: 25,
        name: `/^${filter}.*/i`
      }
    })
    .pipe(
       // Handle any errors and return an alternative value
        // when an error occurs.
        catchError(error => {
          console.error("error",error);
          return (undefined);
        }),
        // Retry the request 3 times before throwing an error.
        // Useful for intermittent network connections.
        retry(3),
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
  //zoek pokemon
  findPokemon(search){
   return this.http.get(`${this.baseUrl}${search}`).pipe(
     map(pokemon => {
       pokemon['image'] = this.getPokeImage(pokemon['id']);
       pokemon['pokeIndex'] = pokemon['id'];
       return pokemon;
     })
   );
 }
  //toon de details van de pokemons
 getPokeDetails(nummerpokemon){
   return this.http.get(`${this.baseUrl}${nummerpokemon}`).pipe(
     map(pokemon =>{
       return pokemon
     })
   );
 }
}