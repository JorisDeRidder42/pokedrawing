import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'draw',
    loadChildren: () => import('./pages/draw/draw.module').then( m => m.DrawPageModule)
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./pages/pokemon/pokemon.module').then( m => m.PokemonPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'random',
    loadChildren: () => import('./pages/random/random.module').then( m => m.RandomPageModule)
  },
  {
    path: 'home/pokemon/:index',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
