import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = "DSV";
  hamburger : boolean = false;
  isMenuOpen : boolean = false;
  
  constructor(){
    if(window.innerWidth < 1000)
      this.hamburger = true;
    else
      this.hamburger = false;
  }

  checkHamburger(){
    if(window.innerWidth < 1000)
      this.hamburger = true;
    else
      this.hamburger = false;
  }
}
