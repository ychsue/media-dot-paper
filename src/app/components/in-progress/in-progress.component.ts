import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.css']
})
export class InProgressComponent implements OnInit {
  static mode = {det: 'determinate', indet: 'indeterminate'};
  @Input() sMode = InProgressComponent.mode.indet;

  @Input() title = 'In progress';
  @Input() message = '';

  constructor() { }

  ngOnInit() {
  }

}

export interface IProgressPara {
  sMode: string;
  title: string;
  message: string;
  value?: number;
}
