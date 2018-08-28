import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    posaoNaziv: new FormControl(''),
    posaoOpis: new FormControl(''),
    posaoDetaljanOpis: new FormControl(''),
    posaoLokacija: new FormControl(''),
    oglasivacNaziv: new FormControl(''),
    oglasivacMail: new FormControl(''),
    oglasivacTel: new FormControl('')
  });

}
