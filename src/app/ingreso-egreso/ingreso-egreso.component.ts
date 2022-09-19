import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngressEgressService} from "../api/ingress-egress.service";
import {IngressEgress} from "../api/models/ingress-egress.model";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as uiActions from "./../shared/ui.actions";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingressEgressForm: FormGroup;
  type: string = 'ingress';
  loading = false;
  loadingSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private ingressEgressService: IngressEgressService,
              private store: Store<AppState>
              ) { }

  ngOnInit(): void {
    this.ingressEgressForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    })

    this.loadingSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    })
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  save() {
    if (this.ingressEgressForm.invalid) {return;}
    this.store.dispatch(uiActions.isLoading());
    const { description, amount } = this.ingressEgressForm.value;
    const ingressEgress = new IngressEgress(description, amount, this.type);
    this.ingressEgressService.createIngressEgress( ingressEgress )
      .then(() => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire('Registro creado', description, 'success');
        this.ingressEgressForm.reset();
      })
      .catch(err => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire('Error', err.message, 'error')
      });
  }

}
