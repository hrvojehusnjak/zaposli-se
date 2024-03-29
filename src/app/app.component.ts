import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isVisible: boolean = false;
  isHidden: boolean = true;
  classes: {};

  constructor(public auth: AuthenticationService) { }

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
      if(!this.isVisible) {
        this.isVisible = true;
        this.isHidden = false;
        this.setClasses();
      }
    } else {
      if(this.isVisible) {
        this.isVisible = false;
        this.isHidden = true;
        this.setClasses();
      }
    }
    setTimeout(() => {}, 200);
  }
}
