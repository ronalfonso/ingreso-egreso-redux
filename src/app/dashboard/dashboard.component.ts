import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppState} from "../app.reducer";
import {Store} from "@ngrx/store";
import {filter, Subscription} from "rxjs";
import {IngressEgressService} from "../api/ingress-egress.service";
import * as IngressEgressActions from "../ingreso-egreso/ingreso-egreso.actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ingressEgressSubs: Subscription;

  constructor(private store: Store<AppState>,
              private ingressEgressService: IngressEgressService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').pipe(
      filter(auth => auth.user != null)
    ).subscribe(({user}) => {
      this.ingressEgressSubs = this.ingressEgressService.initIngressEgressListener(user.uid).subscribe(ingressEgressFirebase => {
        this.store.dispatch(IngressEgressActions.setItems({items: ingressEgressFirebase}))
      })
    })
  }

  ngOnDestroy() {
    this.userSubs?.unsubscribe();
    this.ingressEgressSubs?.unsubscribe();
  }

}
