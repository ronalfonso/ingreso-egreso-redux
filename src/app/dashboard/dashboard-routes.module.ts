import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {dashboardRoutes} from "./dashboard.routes";
import {AuthGuard} from "../api/auth/auth.guard";

const routesChildren: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    canLoad: [AuthGuard]
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routesChildren)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
