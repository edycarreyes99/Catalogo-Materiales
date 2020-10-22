import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Importaciones de los modulos custom
import {MaterialDesignModule} from './modules/material-design/material-design.module';

// Importaciones de firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';

// Importaciones de los environment variables
import {environment} from '../environments/environment';

// Importaciones de los componentes
import {CatalogoComponent} from './views/catalogo/catalogo.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Modulo de material design
    MaterialDesignModule,

    // Modulos de firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence({
      synchronizeTabs: true
    }),
    AngularFirePerformanceModule,
    AngularFireAnalyticsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
