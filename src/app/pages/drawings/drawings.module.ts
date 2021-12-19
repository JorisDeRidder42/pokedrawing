import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrawingsPageRoutingModule } from './drawings-routing.module';

import { DrawingsPage } from './drawings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrawingsPageRoutingModule
  ],
  declarations: [DrawingsPage]
})
export class DrawingsPageModule {}
