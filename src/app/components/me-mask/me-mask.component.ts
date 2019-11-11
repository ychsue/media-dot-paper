import { Component, OnInit } from '@angular/core';
import { MediaEditService } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-me-mask',
  templateUrl: './me-mask.component.html',
  styleUrls: ['./me-mask.component.css']
})
export class MeMaskComponent implements OnInit {

  constructor(public meService: MediaEditService) { }

  ngOnInit() {
  }

}
