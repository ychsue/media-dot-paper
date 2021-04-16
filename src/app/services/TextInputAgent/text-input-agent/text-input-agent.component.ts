import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-text-input-agent',
  templateUrl: './text-input-agent.component.html',
  styleUrls: ['./text-input-agent.component.css']
})
export class TextInputAgentComponent implements OnInit {

  @ViewChild('textData', { static: true }) textDataRef: ElementRef<HTMLTextAreaElement>;

  textChanged$ = new Subject<string>();

  constructor(public dialogRef: MatDialogRef<TextInputAgentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }


  ngOnInit(): void {
  }

}
