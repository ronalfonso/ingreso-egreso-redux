import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IngressEgress} from "./models/ingress-egress.model";
import {AuthService} from "./auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IngressEgressService {

  constructor(private firestone: AngularFirestore,
              private authService: AuthService
              ) { }

  createIngressEgress(ingressEgress: IngressEgress) {
    const uid = this.authService.user.uid;
    return this.firestone.doc(`${uid}/ingress-egress`)
      .collection('items')
      .add({...ingressEgress})
  }
}
