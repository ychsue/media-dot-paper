import { Component, OnInit } from '@angular/core';
import { MediaEditService } from '../../services/media-edit.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(public meService: MediaEditService) { }

  ngOnInit() {
  }

}
