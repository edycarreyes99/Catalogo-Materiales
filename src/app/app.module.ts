import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

// Importaciones de los modulos custom
import {MaterialDesignModule} from './modules/material-design/material-design.module';

// Importaciones de firebase
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFirePerformanceModule} from '@angular/fire/performance';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';

// Importaciones de los environment variables
import {environment} from '../environments/environment';

// Importaciones de los servicios
import {DatabaseService} from './services/database/database.service';

// Importaciones de los componentes
import {CatalogoComponent} from './views/catalogo/catalogo.component';
import {GestionarMaterialModalComponent} from './components/gestionar-material-modal/gestionar-material-modal.component';
import { GestionarCategoriaModalComponent } from './components/gestionar-categoria-modal/gestionar-categoria-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    GestionarMaterialModalComponent,
    GestionarMaterialModalComponent,
    GestionarCategoriaModalComponent
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
    AngularFireAnalyticsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatabaseService,
    GestionarMaterialModalComponent,
    GestionarCategoriaModalComponent
  ],
  entryComponents: [
    GestionarMaterialModalComponent,
    GestionarCategoriaModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
