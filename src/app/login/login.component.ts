import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

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
      this.router.navigateByUrl('/edit');
    }, (err) => {
      console.log(err);
    });
  }

}
