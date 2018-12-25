import { Component } from '@angular/core';
import { GameRequest } from '../entities/gameRequest';
import { TimerService } from '../timerRequest/timer.service';
import { GameSetup } from '../entities/gameSetup';
import { SpeakTime } from '../entities/speakTime';
import { SpeakItem } from '../entities/speakItem';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private timerService: TimerService){}
  gameSetup : GameSetup = new GameSetup(); 

  submitTime():void{
    console.log("gameTime=" + this.gameSetup.gameTime);
    console.log("setupTime=" + this.gameSetup.setupTime);
    let gameRequest = this.buildGameRequest();
    this.timerService.invokeTimer(gameRequest).subscribe();
  }

  buildGameRequest():GameRequest{
    let gameRequest = new GameRequest();
    gameRequest.minutes = this.gameSetup.gameTime + this.gameSetup.setupTime;
    gameRequest.speaktime = new SpeakTime();
    gameRequest.speaktime.speakItems = [];
    gameRequest.speakinterval = "NA";
    let speakItem = new SpeakItem();
    speakItem.time = 3;
    speakItem.say = "3 minutes to go";
    gameRequest.speaktime.speakItems.push(speakItem);
  
    return gameRequest;
  }

}
