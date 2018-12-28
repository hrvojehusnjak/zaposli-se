import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  success: boolean = false;
  error: boolean = false;

  constructor(private auth: AuthenticationService, private oglasService: OglasService) { }

  ngOnInit() {
    this.auth.profile().subscribe((user: Mapping) => {
      this.credentials = user;
      this.oglasService.getOglas(this.credentials.idOglas)
        .subscribe((oglas: Oglas) => {
          this.oglas = oglas;
          this.editOglasForm.patchValue(this.oglas);
          this.success = true;
        window.setTimeout(() => {
          this.success = false;
        }, 5000);
        });
    }, (err) => {
      this.error = true;
      window.setTimeout(() => {
        this.error = false;
      }, 5000);
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
        this.editOglasForm.markAsPristine();
        this.success = true;
        window.setTimeout(() => {
          this.success = false;
        }, 5000);
        this.auth.logout();
      }, (err) => {
        this.error = true;
        window.setTimeout(() => {
          this.error = false;
        }, 5000);
      });
  }

  deleteOglas(id) {
    this.oglasService.deleteOglas(id)
      .subscribe((res) => {
        this.editOglasForm.markAsPristine();
        this.success = true;
        window.setTimeout(() => {
          this.success = false;
        }, 5000);
        this.auth.logout();
      }, (err) => {
        this.error = true;
        window.setTimeout(() => {
          this.error = false;
        }, 5000);
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
    this.auth.logout();
    return true;
  }

  checkTextAreaRows(event) {
    if (event.target.scrollHeight > event.target.offsetHeight) {
      event.target.style.height = (event.target.scrollHeight + 5)+'px';
      return;
    }
    let key = event.keyCode || event.charCode;
    if (key === 8 || key === 46) {
      this.reduceTextAreaHeight(event);
    }
  }

  reduceTextAreaHeight(event) {
    // timeout za doc do event.target.value nakon cuta
    setTimeout(() => {
      let lines = event.target.value.split(/\r|\r\n|\n/).length;
      if(lines*18 < event.target.scrollHeight) {
        event.target.style.height = (lines*18 + 5) + 'px';
      }
    }, 0);
  }

}
