import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SpeakTime } from '../entities/speakTime';

@Component({
  selector: 'app-speakentry',
  templateUrl: './speakentry.component.html',
  styleUrls: ['./speakentry.component.scss']
})
export class SpeakentryComponent implements OnInit {

  speakTime : SpeakTime = new SpeakTime();
  @Output() speakEntryEvent = new EventEmitter<SpeakTime>();
  constructor() { }

  ngOnInit() {
  }

  createSpeakEntry(){
    this.speakEntryEvent.emit(this.speakTime);
  }
}
