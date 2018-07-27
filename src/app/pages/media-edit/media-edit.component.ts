import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaEditService } from '../../services/media-edit.service';
import { trigger, state, style, transition, animate } from '../../../../node_modules/@angular/animations';

@Component({
  selector: 'app-media-edit',
  templateUrl: './media-edit.component.html',
  styleUrls: ['./media-edit.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class MediaEditComponent implements OnInit {

  constructor(/*private route: ActivatedRoute, */
    public meService: MediaEditService) {
  }

  ngOnInit() {
    // const self = this;
    // this.route.paramMap.subscribe( (paraM) => {
    //   const para = decodeURIComponent(paraM.get('inUrl'));
    //   let inData: Blob|string;
    //   if (para !== '0') {
    //     inData = para;
    //   } else {
    //     inData = this.meService.blob;
    //   }
    //   self.meService.initMe(inData);
    // });
  }

}
