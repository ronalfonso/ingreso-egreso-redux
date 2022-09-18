import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authServie: AuthService,
              private router: Router) {
  }
  canActivate(): Observable<boolean> {
    return this.authServie.isAuth()
      .pipe(
        tap(estado => {
          if (!estado) {this.router.navigate(['/login'])}
        })
      );
  }

}
