import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/about/about.module').then(m => m.AboutPageModule)
          }
        ]
      },
      {
        path: 'draw',
        children: [
          {
            path: '',
           loadChildren: () => import('../pages/draw/draw.module').then( m => m.DrawPageModule)
          }
        ]
      },
      {
        path: 'pokemon',
        children: [
          {
            path: '',
           loadChildren: () => import('../pages/pokemon/pokemon.module').then( m => m.PokemonPageModule)
          }
        ]
      },
      {
        path: 'random',
        children: [
          {
            path: '',
           loadChildren: () => import('../pages/random/random.module').then( m => m.RandomPageModule)
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
