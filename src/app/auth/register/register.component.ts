import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../api/auth/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public fb: FormBuilder,
              public authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  crearUsuario() {
    if (this.registerForm.invalid) {return;}
    Swal.fire({
      title: 'Espere Por favor!!!',
      didOpen: () => {
        Swal.showLoading()
      }})
    this.authService.createUser(this.registerForm.value)
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
