import { Component, OnInit } from '@angular/core';
import { GameRequest } from '../entities/gameRequest';
import { TimerService } from '../timerRequest/timer.service';
import { GameSetup } from '../entities/gameSetup';
import { Storage } from '@ionic/storage'
import { AdminGlobals } from '../admin/admin-globals';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  ngOnInit() {
    this.route.params.subscribe(params => {
      let gameName = params['gameName'];
      console.log("in OnInit:" + gameName);
      this.globals.gameSetupList.forEach(item => {
        console.log("looping gameName=" + gameName);
        console.log("looping item name=" + item.gameName);
        
        if (gameName == item.gameName) {
          this.gameSetup = item;
        }
      });
    });
  }

  constructor(private timerService: TimerService, private storage: Storage, private globals: AdminGlobals, private route: ActivatedRoute,
    private router: Router) { }
  gameSetup: GameSetup = new GameSetup();
  gameRequest: GameRequest = new GameRequest();

  submitTime(): void {
    console.log("gameTime=" + this.gameSetup.gameTime);
    console.log("setupTime=" + this.gameSetup.setupTime);
    let gameRequest = this.buildGameRequest();
    this.saveGameSetup();
    this.timerService.invokeTimer(gameRequest).subscribe();
  }

  saveGameSetup(): void {

    this.globals.gameSetupList.forEach(item => {
      console.log("name" + item.gameName);
      console.log("time" + item.gameTime);
    });

    this.globals.gameSetupList.push(this.gameSetup);
    this.storage.set(this.gameSetup.gameName, this.gameSetup);
    this.clearTimerSetup();
  }

  buildGameRequest(): GameRequest {
    let gameRequest = this.timerService.setupGame(this.gameSetup);
    return gameRequest;
  }

  receiveSpeakEntry($event) {
    console.log("got message", $event);
    this.gameSetup.speakTimeList.push($event);
    this.updateGameRequest();

  }

  updateGameRequest() {
    this.gameRequest = this.timerService.setupGame(this.gameSetup);
    if (this.gameRequest.speaktime != null) {
      this.gameRequest.speaktime = this.gameRequest.speaktime.sort((one, two): number => {
        let firstMin = +(one.time.split(':')[0]);
        firstMin = firstMin ? firstMin : 0;
        let firstSec = +(one.time.split(':')[1]);
        firstSec = firstSec ? firstSec : 0;
        let secMin = +(two.time.split(':')[0]);
        secMin = secMin ? secMin : 0;
        let secSec = +(two.time.split(':')[1]);
        secSec = secSec ? secSec : 0;
        console.log("firstMin=" + String(firstMin));
        console.log("firstSec=" + String(firstSec));
        console.log("secMin=" + String(secMin));
        console.log("secSec=" + String(secSec));


        if (firstMin == secMin) {
          // if minutes are same just compare seconds
          firstMin = firstSec;
          secMin = secSec;
        }
        if (firstMin < secMin) {
          return 1;
        }
        if (firstMin > secMin) {
          return -1;
        }
        return 0;
      });
    }
  }

  entry() { }

  clearTimerSetup() {
    this.gameRequest = new GameRequest();
    this.gameSetup = new GameSetup();
  }
}
