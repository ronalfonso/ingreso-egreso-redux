import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modules
import { AppRoutingModule } from "./app-routing.module";

//Firebase
import { FIREBASE_OPTIONS} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

//Ngrx
import {StoreModule} from "@ngrx/store";
import {appReducers} from "./app.reducer";

import { AppComponent } from './app.component';
import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

//Modules
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AuthModule,

    AppRoutingModule,

    provideFirebaseApp(
      () => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production, // Restrict extension to log-only mode
        }),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
