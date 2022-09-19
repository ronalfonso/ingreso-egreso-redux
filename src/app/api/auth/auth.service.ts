import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Subscription} from "rxjs";
import {User} from "../models/user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import * as authAction from "../../auth/auth.actions";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import * as ingressEgressActions from "../../ingreso-egreso/ingreso-egreso.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: User;

  get user() {
    return {...this._user}
  }

  constructor(public auth: AngularFireAuth,
              private firestone: AngularFirestore,
              private store: Store<AppState>
  ) {
  }

  async iniAuthListener() {
    this.auth.authState.subscribe(async fuser => {
      if (fuser) {
        this.userSubscription = this.firestone.doc(`${fuser.uid}/user`).valueChanges()
          .subscribe((firestoneUser: any) => {
            const user = User.fromFirestone(firestoneUser);
            this._user = user;
            this.store.dispatch(authAction.setUser({user}))
          })
      } else {
        this._user = null;
        this.userSubscription.unsubscribe();
        this.store.dispatch(authAction.unSetUser())
        this.store.dispatch(ingressEgressActions.unSetItems())
      }
    })
  }

  async createUser({nombre, email, password}: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        const newUser = new User(user.uid, nombre, user.email);

        return this.firestone.doc(`${user.uid}/user`).set({...newUser});
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
