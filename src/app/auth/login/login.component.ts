import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {AuthService} from "../../api/auth/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import * as ui from "./../../shared/ui.actions";
import {Subscription} from "rxjs";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui').subscribe(UI => this.loading = UI.isLoading)
  }

  ngOnDestroy() {
    this.uiSubscription?.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {return;}

    this.store.dispatch(ui.isLoading());
    this.authService.loginUser(this.loginForm.value)
      .then(() => {
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/'])
      })
      .catch(e => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        })
      })
  }

}
