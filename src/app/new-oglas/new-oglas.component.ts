import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

import { OglasService } from '../oglas.service';

import { atLeastOne } from '../at-least-one-validator';
import { AuthenticationService } from '../authentication.service';
import { NotyfService } from 'ng-notyf';

@Component({
  selector: 'app-new-oglas',
  templateUrl: './new-oglas.component.html',
  styleUrls: ['./new-oglas.component.css']
})
export class NewOglasComponent implements OnInit {

  constructor(private oglasService: OglasService, private auth: AuthenticationService, private notyfService: NotyfService) {
    this.notyfService.toastStyle = { 'background-color': '#1656A3', 'color': 'white', 'border-radius': '3px', 'box-shadow': 'none' };
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.auth.logout();
    }
  }

  newOglasForm = new FormGroup({
    posaoNaziv: new FormControl('', [Validators.maxLength(50), Validators.required]),
    posaoOpis: new FormControl('', [Validators.maxLength(200), Validators.required]),
    posaoDetaljanOpis: new FormControl('', Validators.maxLength(1000)),
    posaoLokacija: new FormControl('', [Validators.maxLength(200), Validators.required]),
    oglasivacNaziv: new FormControl('', [Validators.maxLength(100), Validators.required]),
    oglasivacMail: new FormControl('', Validators.email),
    oglasivacTel: new FormControl('', [Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.maxLength(20)]),
    acceptTerms: new FormControl(false, Validators.required)
  }, atLeastOne(Validators.required, ['oglasivacMail','oglasivacTel']));

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

  onSubmit() {
    let oglas = this.newOglasForm.value;
    this.oglasService.addOglas(oglas)
      .subscribe((res: Response) => {
        if (res.status >= 200 && res.status < 300) {
          this.newOglasForm.reset();
          this.notyfService.success('Oglas spremljen');
        }
        else {
          this.notyfService.error('Neuspješno spremanje oglasa');
        }
      });
  }

}
