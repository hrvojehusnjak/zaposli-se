import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OglasService } from '../oglas.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  oglasi;

  constructor(private oglasService: OglasService, private auth: AuthenticationService) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.logout();
    }
    this.getOglasi();
  }

  getOglasi() {
    this.oglasService.getOglasi()
      .subscribe(oglasi => this.oglasi = oglasi);
  }
}
