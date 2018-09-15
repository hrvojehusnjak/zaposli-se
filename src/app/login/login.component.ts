import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

import { NotyfService } from 'ng-notyf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router, private notyfService: NotyfService) {
    this.notyfService.toastStyle = { 'background-color': '#1656A3', 'color': 'white', 'border-radius': '3px', 'box-shadow': 'none' };
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl('/edit');
    }
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  });

  login() {
    let formValue = this.loginForm.value;
    let credentials = JSON.stringify(formValue);
    this.auth.login(formValue).subscribe(() => {
      this.notyfService.success('Oglas pronađen');
      this.router.navigateByUrl('/edit');
    }, (err) => {
      this.notyfService.error('Oglas nije pronađen');
    });
  }

}
