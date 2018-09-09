import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-new-oglas',
  templateUrl: './new-oglas.component.html',
  styleUrls: ['./new-oglas.component.css']
})
export class NewOglasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newOglasForm = new FormGroup({
    posaoNaziv: new FormControl('', [Validators.maxLength(50), Validators.required]),
    posaoOpis: new FormControl('', [Validators.maxLength(200), Validators.required]),
    posaoDetaljanOpis: new FormControl('', Validators.maxLength(1000)),
    posaoLokacija: new FormControl('', [Validators.maxLength(200), Validators.required]),
    oglasivacNaziv: new FormControl('', [Validators.maxLength(200), Validators.required]),
    oglasivacMail: new FormControl('', [Validators.email, Validators.required]),
    oglasivacTel: new FormControl('', [Validators.pattern('[0-9]+'), Validators.minLength(9), Validators.required])
  });

  onSubmit() {
    console.log(this.newOglasForm.value);
  }

}
