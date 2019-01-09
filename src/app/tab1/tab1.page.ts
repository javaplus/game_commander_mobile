import { Component } from '@angular/core';
import { AdminGlobals } from '../admin/admin-globals';
import { TimerService } from '../timerRequest/timer.service';
import { GameSetup } from '../entities/gameSetup';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private globals: AdminGlobals, private timerService:TimerService, private storage : Storage, private route: ActivatedRoute,
    private router: Router){
   
  }
  message : string = "Tab1 Game Commander!!!";

  gameSetupList : GameSetup[] = [];
  editTimer(gameName:string){
    this.router.navigate(['/tabs/tab2', gameName]);
  }

  startTimer(gameName: string){
    let gameSetup = null;
    this.globals.gameSetupList.forEach(element => {
      if(element.gameName == gameName){
        gameSetup = element;
      }
    });
    this.timerService.invokeTimerForGameSetup(gameSetup).subscribe();

  }

  deleteTimer(gameName:string){
    this.storage.remove(gameName);

    this.globals.gameSetupList = this.globals.gameSetupList.filter(item => item.gameName != gameName);
    
  }
}
