import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CatalogoComponent} from './views/catalogo/catalogo.component';

const routes: Routes = [
  {path: '', component: CatalogoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
