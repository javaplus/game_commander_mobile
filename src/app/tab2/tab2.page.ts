import { Component } from '@angular/core';
import { GameRequest } from '../entities/gameRequest';
import { TimerService } from '../timerRequest/timer.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private timerService: TimerService){}
  gameRequest : GameRequest = new GameRequest(); 

  submitTime():void{
    console.log("gameTime=" + this.gameRequest.gameTime);
    this.timerService.invokeTimer(this.gameRequest).subscribe();
  }
}
