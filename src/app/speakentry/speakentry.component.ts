import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  speakTime : SpeakTime = new SpeakTime();
  @Output() speakEntryEvent = new EventEmitter<SpeakTime>();


  ngOnInit() {
    this.route.params.subscribe(params => {
      let gameName = params['gameName'];
      let time = params['time'];
      if(gameName && time){
        this.speakTime = this.timerService.getSpeakTimeForGameNameAndTime(gameName, time);
      }
    });
  }

  createSpeakEntry(){
    this.speakEntryEvent.emit(this.speakTime);
    this.speakTime = new SpeakTime();
  }
}
