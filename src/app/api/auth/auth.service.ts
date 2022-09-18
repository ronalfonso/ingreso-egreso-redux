import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map} from "rxjs";
import {User} from "../models/user.model";
import {Firestore, collection, addDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth,
              public firestone: Firestore
  ) { }

  iniAuthListener() {
    this.auth.authState.subscribe(fuser => {
      console.log(fuser);
      console.log(fuser?.email);
      console.log(fuser?.uid);
    })
  }

  createUser({nombre, email, password}: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( ({user}) => {
        const newUser = new User(user.uid, nombre, user.email );

        const userRef = collection(this.firestone, 'user');
        return addDoc(userRef, {...newUser})
      })
  }

  loginUser({email, password}: any) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fuser => fuser != null)
    );
  }
}
