import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaEditService } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-media-edit',
  templateUrl: './media-edit.component.html',
  styleUrls: ['./media-edit.component.css']
})
export class MediaEditComponent implements OnInit {

  constructor(/*private route: ActivatedRoute, */
    public dataService: MediaEditService) {
  }

  ngOnInit() {
    // const self = this;
    // this.route.paramMap.subscribe( (paraM) => {
    //   const para = decodeURIComponent(paraM.get('inUrl'));
    //   let inData: Blob|string;
    //   if (para !== '0') {
    //     inData = para;
    //   } else {
    //     inData = this.dataService.blob;
    //   }
    //   self.dataService.initMe(inData);
    // });
  }

}
