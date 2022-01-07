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
import { enableIndexedDbPersistence, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { Storage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent, CanvasDrawComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule, 
      HttpClientModule,
      CommonModule,
      // Firebase main import.
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    // Firestore database import
    provideFirestore(() => {
      const firestore = getFirestore();
      // Enable offline persistence.
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,}],
  bootstrap: [AppComponent],
})
export class AppModule {}
