import { Component, OnInit } from '@angular/core';
import { MediaEditService, playerAction } from 'src/app/services/media-edit.service';

@Component({
  selector: 'app-me-mani-plate',
  templateUrl: './me-mani-plate.component.html',
  styleUrls: ['./me-mani-plate.component.css']
})
export class MeManiPlateComponent implements OnInit {

  constructor(public dataService: MediaEditService) { }

  ngOnInit() {
  }
}
