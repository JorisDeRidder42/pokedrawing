export interface pokemonApiResult<T>{
    abilities: T[];
    name: string;
    id: number;
    height: number;
    weight: number;
}