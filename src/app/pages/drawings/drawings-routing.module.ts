import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrawingsPage } from './drawings.page';

const routes: Routes = [
  {
    path: '',
    component: DrawingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrawingsPageRoutingModule {}
