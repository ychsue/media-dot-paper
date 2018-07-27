import { Component, OnInit } from '@angular/core';
import { MediaEditService, playerAction } from 'src/app/services/media-edit.service';
import { trigger, transition, style, animate } from '../../../../node_modules/@angular/animations';

@Component({
  selector: 'app-me-mani-plate',
  templateUrl: './me-mani-plate.component.html',
  styleUrls: ['./me-mani-plate.component.css'],
  animations: [
    trigger('changeFrame', [
      transition('* => *', [
        style({transform: 'translateY(-100%)'}),
        animate('0.2s 0.1s ease-in', style({transform: 'translateY(0)'}))
      ])
    ])
  ]
})
export class MeManiPlateComponent implements OnInit {

  constructor(public meService: MediaEditService) { }

  ngOnInit() {
  }
}
