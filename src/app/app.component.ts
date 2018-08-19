import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isVisible: boolean = false;
  isHidden: boolean = true;
  classes: {};

  ngOnInit() {
    this.setClasses();
  }

  setClasses() {
    this.classes = {
      'visible': this.isVisible,
      'hidden': this.isHidden,
      'add-nav-border': this.isVisible
    };
  }
  navScrollHandler(ev) {
    var scrollTop = window.pageYOffset || document.body.scrollTop;
    if (scrollTop > 20) {
      this.isVisible = true;
      this.isHidden = false;
      this.setClasses();
    } else {
      this.isVisible = false;
      this.isHidden = true;
      this.setClasses();
    }
  }
}
