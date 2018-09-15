import { Component, OnInit, Renderer2, ElementRef, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-oglas',
  templateUrl: './oglas.component.html',
  styleUrls: ['./oglas.component.css']
})
export class OglasComponent implements OnInit {

  @Input() oglas;

  fullView: boolean = false;

  constructor(private renderer: Renderer2,private elRef: ElementRef) { }

  ngOnInit() {
  }

  switchToMinView() {
    console.log('yo get min view');
    this.renderer.removeClass(this.elRef.nativeElement, 'full-view');
    this.fullView = false;
  }

  switchToFullView() {
    console.log('hey get full view');
    this.renderer.addClass(this.elRef.nativeElement, 'full-view');
    this.fullView = true;
  }

}
