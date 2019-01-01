import { Component } from '@angular/core';
import { GameRequest } from '../entities/gameRequest';
import { TimerService } from '../timerRequest/timer.service';
import { GameSetup } from '../entities/gameSetup';

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
    let gameRequest = this.timerService.setupGame(this.gameSetup);
    return gameRequest;
  }

  receiveSpeakEntry($event){
    console.log("got message", $event);
  }

}
