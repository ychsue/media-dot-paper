import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  testUrl = encodeURIComponent('https://dzxuyknqkmi1e.cloudfront.net/odb/2018/06/odb-06-12-18.mp3');
  testYoutubeUrl = encodeURIComponent('https://youtu.be/f1SZ5GaAp3g');
  constructor() { }

  ngOnInit() {
  }

}
