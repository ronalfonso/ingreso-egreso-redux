import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../api/auth/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {filter, Subscription} from "rxjs";
import {User} from "../../api/models/user.model";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  user: User;
  userSubs: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('auth')
      .pipe(
        filter(({user}) => user != null)
      )
      .subscribe(({user}) => {
      this.user = user;
    })
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  logout() {
    Swal.fire({
      title: 'Cerrando session!!!',
      didOpen: () => {
        Swal.showLoading()
      }})
    this.authService.logout()
      .then(() => {
        Swal.close();
        this.router.navigate(['/login'])
      })
  }
}
