import { Component, OnInit } from '@angular/core';
import { GameRequest } from '../entities/gameRequest';
import { TimerService } from '../timerRequest/timer.service';
import { GameSetup } from '../entities/gameSetup';
import { Storage } from '@ionic/storage'
import { AdminGlobals } from '../admin/admin-globals';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SpeakTime } from '../entities/speakTime';


@Component({
  selector: 'app-setupTab',
  templateUrl: 'setupTab.page.html',
  styleUrls: ['setupTab.page.scss']
})
export class SetupTabPage implements OnInit {

  ngOnInit() {
    this.route.params.subscribe(params => {
      let gameName = params['gameName'];
      if(gameName!=null){
        this.update = true;
      }
      console.log("in OnInit:" + gameName);
      this.globals.gameSetupList.forEach(item => {
        console.log("looping gameName=" + gameName);
        console.log("looping item name=" + item.gameName);
        
        if (gameName == item.gameName) {
          this.gameSetup = item;
          console.log(this.gameSetup);
          this.updateGameRequest();
        }
      });
    });
  }

  constructor(private timerService: TimerService, private storage: Storage, private globals: AdminGlobals, private route: ActivatedRoute,
    private router: Router) { }
  gameSetup: GameSetup = new GameSetup();
  gameRequest: GameRequest = new GameRequest();
  update:boolean = false;
  speakTime:SpeakTime = new SpeakTime();

  submitTime(): void {
    console.log("gameTime=" + this.gameSetup.gameTime);
    console.log("setupTime=" + this.gameSetup.setupTime);
    let gameRequest = this.buildGameRequest();
    this.saveGameSetup();
    this.timerService.invokeTimer(gameRequest).subscribe();
  }

  saveGameSetup(): void {
    // don't add if already exists:
    if(!this.update){
      this.globals.gameSetupList.push(this.gameSetup);
    }
    this.storage.set(this.gameSetup.gameName, this.gameSetup);
    this.clearTimerSetup();
    this.router.navigate(['/tabs/tab1']);
  }

  addInterval(){
    if(this.gameSetup.intervalTime > 0){
      let newSpeakItems:SpeakTime[] = this.timerService.buildIntervalSpeakTime(this.gameSetup.intervalTime, this.gameSetup.gameTime);
      this.gameSetup.speakTimeList = this.gameSetup.speakTimeList.concat(newSpeakItems);
    }
    this.gameRequest = this.timerService.setupGame(this.gameSetup);    
  }

  buildGameRequest(): GameRequest {
    let gameRequest = this.timerService.setupGame(this.gameSetup);
    return gameRequest;
  }

  receiveSpeakEntry($event) {
    console.log("got message", $event);
    // blank out current speak time
    this.speakTime = new SpeakTime();
    // remove if that time already exists
    this.gameSetup.speakTimeList = this.gameSetup.speakTimeList.filter(speakTime=> speakTime.time!=$event.time);
    this.gameSetup.speakTimeList.push($event);
    this.updateGameRequest();

  }

  updateSpeakTime(time:any){
    console.log("Updating speak time!");
    console.log(time);
    console.log("Speak time=" + time);
    this.gameSetup.speakTimeList.forEach(currentSpeakTime => {
      if(currentSpeakTime.time == time){
        this.speakTime = currentSpeakTime;
      }
    });
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
    this.speakTime = new SpeakTime();
    this.update = false;
  }
}
