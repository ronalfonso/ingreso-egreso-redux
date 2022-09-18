import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../api/auth/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs";
import * as ui from "../../shared/ui.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui').subscribe(UI => this.loading = UI.isLoading)
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

  createUser() {
    if (this.registerForm.invalid) {return;}
    this.store.dispatch(ui.isLoading());
    this.authService.createUser(this.registerForm.value)
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
