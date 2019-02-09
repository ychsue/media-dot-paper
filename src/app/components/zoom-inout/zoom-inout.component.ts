import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-zoom-inout',
  templateUrl: './zoom-inout.component.html',
  styleUrls: ['./zoom-inout.component.css']
})
export class ZoomInoutComponent implements OnInit {

  @Input() value: number;
  @Output() change = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

}
