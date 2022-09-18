import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../api/auth/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.invalid) {return;}
    Swal.fire({
      title: 'Espere Por favor!!!',
      didOpen: () => {
        Swal.showLoading()
      }})
    this.authService.loginUser(this.loginForm.value)
      .then(() => {
        this.router.navigate(['/'])
        Swal.close();
      })
      .catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: e.message,
        })
      })
  }

}
