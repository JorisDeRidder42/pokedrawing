export interface pokemon {
    id: number;
    name: string;
    sprites: [{back_default: string, back_shiny: string, front_default: string, front_shiny: string}];
    forms: [{name:string, url:string}];
    stats:[{base_stat:number, effort:number}];
    other: [];
    weight: number;
  }