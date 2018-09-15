import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NotyfService } from 'ng-notyf';

import { AuthenticationService } from '../authentication.service';
import { OglasService } from '../oglas.service';
import { Oglas } from '../oglas';
import { Mapping } from '../mapping';
import { atLeastOne } from '../at-least-one-validator';

@Component({
  selector: 'app-edit-oglas',
  templateUrl: './edit-oglas.component.html',
  styleUrls: ['./edit-oglas.component.css']
})
export class EditOglasComponent implements OnInit {

  credentials: Mapping;
  oglas: Oglas;

  constructor(private auth: AuthenticationService, private oglasService: OglasService, private notyfService: NotyfService) {
    this.notyfService.toastStyle = { 'background-color': '#1656A3', 'color': 'white', 'border-radius': '3px', 'box-shadow': 'none' };
  }

  ngOnInit() {
    this.auth.profile().subscribe((user: Mapping) => {
      this.credentials = user;
      this.oglasService.getOglas(this.credentials.idOglas)
        .subscribe((oglas: Oglas) => {
          this.oglas = oglas;
          this.editOglasForm.patchValue(this.oglas);
        });
    }, (err) => {
      this.notyfService.error('Neuspjelo učitavanje oglasa');
      console.error(err);
    });
  }

  editOglasForm = new FormGroup({
    posaoNaziv: new FormControl('', [Validators.maxLength(50), Validators.required]),
    posaoOpis: new FormControl('', [Validators.maxLength(200), Validators.required]),
    posaoDetaljanOpis: new FormControl('', Validators.maxLength(1000)),
    posaoLokacija: new FormControl('', [Validators.maxLength(200), Validators.required]),
    oglasivacNaziv: new FormControl('', [Validators.maxLength(100), Validators.required]),
    oglasivacMail: new FormControl('', Validators.email),
    oglasivacTel: new FormControl('', [Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.maxLength(20)])
  }, atLeastOne(Validators.required, ['oglasivacMail','oglasivacTel']));

  saveAndExit() {
    let editedOglas = this.editOglasForm.value;
    let filteredEdit = {
      _id: this.oglas._id,
      posaoNaziv: editedOglas.posaoNaziv,
      posaoOpis: editedOglas.posaoOpis,
      posaoDetaljanOpis: editedOglas.posaoDetaljanOpis,
      posaoLokacija: editedOglas.posaoLokacija,
      oglasivacNaziv: editedOglas.oglasivacNaziv,
      oglasivacMail: editedOglas.oglasivacMail,
      oglasivacTel: editedOglas.oglasivacTel
    };
    this.oglasService.putOglas(filteredEdit)
      .subscribe((res: Response) => {
        if (res.status >= 200 && res.status < 300) {
          this.notyfService.success('Promjene spremljene');
          this.editOglasForm.markAsPristine();
          this.auth.logout();
        }
      }, (err) => {
        this.notyfService.error('Neuspješno spremanje promjena');
      });
  }

  deleteOglas(id) {
    this.oglasService.deleteOglas(id)
      .subscribe((res) => {
        this.notyfService.success('Oglas izbrisan');
        this.editOglasForm.markAsPristine();
        this.auth.logout();
      }, (err) => {
        this.notyfService.error('Neuspješno brisanje oglasa');
      });
  }

  exit() {
    this.editOglasForm.markAsPristine();
    this.auth.logout();
  }

  canDeactivate() {
    if (this.editOglasForm.dirty) {
      return window.confirm('Promjene nisu spremljene, želite li napustiti stranicu?');
    }
    return true;
  }

}
