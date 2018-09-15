import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class OglasService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getOglasi() {
    return this.http.get('/oglasi');
  }

  getOglas(oglasId) {
    return this.http.get(`/oglasi/${oglasId}`);
  }

  addOglas(oglas) {
    return this.http.post('/oglasi', oglas);
  }

  putOglas(oglas) {
    return this.http.put(`/oglasi/${oglas._id}`, oglas, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  deleteOglas(oglasId) {
    return this.http.delete(`/oglasi/${oglasId}`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }
}
