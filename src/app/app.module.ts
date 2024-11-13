import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
export const config = {
  apiKey: "AIzaSyD_mxwwluDjdMGZSvyeK1dcwn8SxW8SE2A",
  authDomain: "aquivoceavalia-69112.firebaseapp.com",
  projectId: "aquivoceavalia-69112",
  storageBucket: "aquivoceavalia-69112.appspot.com",
  messagingSenderId: "37189337955",
  appId: "1:37189337955:web:2dd3cdc6018fc01e6c0956",
  measurementId: "G-NP5Q6J0DNH"
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, InAppBrowser],
  bootstrap: [AppComponent],
})
export class AppModule { }
