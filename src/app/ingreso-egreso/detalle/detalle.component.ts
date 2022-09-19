import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {IngressEgress} from "../../api/models/ingress-egress.model";
import {Subscription} from "rxjs";
import {IngressEgressService} from "../../api/ingress-egress.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>,
              private ingressEgressService: IngressEgressService) { }

  ingressEgress: IngressEgress[] = [];
  ingressEgressSubs: Subscription;

  ngOnInit(): void {
    this.ingressEgressSubs = this.store.select('ingressEgress').subscribe(({items}) => this.ingressEgress = items)
  }

  ngOnDestroy() {
    this.ingressEgressSubs.unsubscribe();
  }

  delete(uid: string) {
    this.ingressEgressService.deleteItem(uid).then( () => {
      Swal.fire('Borrado', 'Item borrado', 'success')
    })
      .catch(err => {
        Swal.fire('Error', err.message, 'error')
      })
  }

}
