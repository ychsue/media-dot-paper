import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pronun-exer',
  templateUrl: './pronun-exer.component.html',
  styleUrls: ['./pronun-exer.component.css', '../../common-use.css']
})
export class PronunExerComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
