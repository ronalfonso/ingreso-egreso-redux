import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    loadChildren: () => import('./ingreso-egreso/ingress-egress.module')
      .then( m => m.IngressEgressModule)
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( ROUTES )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
