import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../api/auth/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  name = '';

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter(({user}) => user != null)
      )
      .subscribe(({user}) => {
      this.name = user.name;
    })
  }

  ngOnDestroy() {
    this.userSubs?.unsubscribe();
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
