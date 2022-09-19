import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {IngressEgress} from "./models/ingress-egress.model";
import {AuthService} from "./auth/auth.service";
import {map} from "rxjs";

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

  initIngressEgressListener(uid: string) {
    return this.firestone.collection(`${uid}/ingress-egress/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => {
          return snapshot.map( doc => ({
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            })
          )
        } )
      )
  }

  deleteItem(uid: string) {
    const uidUser = this.authService.user.uid;
    return this.firestone.doc(`${uidUser}/ingress-egress/items/${uid}`).delete()
  }
}
