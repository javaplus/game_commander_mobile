import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SpeakTime } from '../entities/speakTime';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerService } from '../timerRequest/timer.service';

@Component({
  selector: 'app-speakentry',
  templateUrl: './speakentry.component.html',
  styleUrls: ['./speakentry.component.scss']
})
export class SpeakentryComponent implements OnInit {

  constructor(private timerService: TimerService, private route: ActivatedRoute, private router: Router){}

  @Input() speakTime : SpeakTime;
  @Output() speakEntryEvent = new EventEmitter<SpeakTime>();


  ngOnInit() {
    if(this.speakTime==null){
      this.speakTime = new SpeakTime();
    }
  }

  createSpeakEntry(){
    this.speakEntryEvent.emit(this.speakTime);
    this.speakTime = new SpeakTime();
  }
}
