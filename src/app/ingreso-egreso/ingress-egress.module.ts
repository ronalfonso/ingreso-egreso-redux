import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";

import {OrderIngressPipe} from "../api/pipes/order-ingress.pipe";

import {DashboardComponent} from "../dashboard/dashboard.component";
import {IngresoEgresoComponent} from "./ingreso-egreso.component";
import {EstadisticaComponent} from "./estadistica/estadistica.component";
import {DetalleComponent} from "./detalle/detalle.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutesModule} from "../dashboard/dashboard-routes.module";
import {StoreModule} from "@ngrx/store";
import {ingressEgressReducer} from "./ingreso-egreso.reducer";



@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrderIngressPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature('ingressEgress', ingressEgressReducer)
  ],
  exports: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
  ]
})
export class IngressEgressModule { }
