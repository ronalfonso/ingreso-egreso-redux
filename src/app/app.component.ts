import { Component } from '@angular/core';
import {AuthService} from "./api/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ingresoEgresos';

  constructor(private authService: AuthService) {
    this.authService.iniAuthListener();
  }


}
