import { Component } from '@angular/core';
import { simpleLinkedList } from 'src/shared/models/simpleLinkedList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  SLL: simpleLinkedList = new simpleLinkedList();
  SLLAsArray: number[] = [];

  constructor() {
    this.SLLAsArray = this.SLL.asArray();  
  }

  refresh(){
    this.SLLAsArray = this.SLL.asArray(); 
  }
}
