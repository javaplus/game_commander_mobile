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
  gameRequest : GameRequest = new GameRequest();
  

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
    this.gameSetup.speakTimeList.push($event);
    this.updateGameRequest();
    
  }

  updateGameRequest(){
    this.gameRequest = this.timerService.setupGame(this.gameSetup);
    if(this.gameRequest.speaktime!=null){
      this.gameRequest.speaktime = this.gameRequest.speaktime.sort((one, two):number=>{
          let firstMin = +(one.time.split(':')[0]);
          let firstSec = +(one.time.split(':')[1]);
          let secMin = +(two.time.split(':')[0]);
          let secSec = +(two.time.split(':')[1]);
          /*console.log("firstMin=" + String(firstMin));
          console.log("firstSec=" + String(firstSec));
          console.log("secMin=" + String(secMin));
          console.log("secSec=" + String(secSec));
          */
          
          if(firstMin == secMin){
            // if minutes are same just compare seconds
            firstMin = firstSec;
            secMin = secSec;
          }
          if(firstMin < secMin){
             return 1;
          }
          if(firstMin > secMin){
            return -1;
          }
          return 0;
      });
    }
  }
}
