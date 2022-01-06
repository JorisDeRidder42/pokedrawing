import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CanvasDrawComponent } from './canvas-draw/canvas-draw.component';
import { CommonModule } from '@angular/common';

import { environment } from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [AppComponent, CanvasDrawComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule, 
      HttpClientModule,
      CommonModule,
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig),provideFirestore(() => getFirestore()))],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,}],
  bootstrap: [AppComponent],
})
export class AppModule {}
