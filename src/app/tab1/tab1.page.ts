import { Component } from '@angular/core';
import { AdminGlobals } from '../admin/admin-globals';
import { TimerService } from '../timerRequest/timer.service';
import { GameSetup } from '../entities/gameSetup';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private globals: AdminGlobals, private timerService:TimerService, private storage : Storage){
    this.refresh();
  }
  message : string = "Tab1 Game Commander!!!";

  gameSetupList : GameSetup[] = [];
  editThis(something:string){}

  startTimer(gameName: string){
    let gameSetup = null;
    this.globals.gameSetupList.forEach(element => {
      if(element.gameName == gameName){
        gameSetup = element;
      }
    });
    this.timerService.invokeTimerForGameSetup(gameSetup).subscribe();

  }

  refresh(){
    /*this.storage.forEach((value, key, iter)=>{
      console.log("key=" + key);
      console.log("value.gameName=" + value.gameName);
      this.gameSetupList.push(value);
    });*/
  }
}
