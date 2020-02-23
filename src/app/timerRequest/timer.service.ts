import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GameRequest } from '../entities/gameRequest';
import { GameSetup } from '../entities/gameSetup';
import { SpeakTime } from '../entities/speakTime';
import { AdminGlobals } from '../admin/admin-globals';



@Injectable({
    providedIn: 'root'
})
export class TimerService {

    constructor(private httpClient: HttpClient, private global_admin: AdminGlobals) { }

    
    invokeTimer(timerRequest : GameRequest):Observable<String>{
        console.log('about to invoke timer:', timerRequest);
        return this.httpClient.post<String>(this.global_admin.server_address, timerRequest).pipe(
            catchError(this.handleError<String>('invokeTimer'))
          );
    }

    invokeTimerForGameSetup(gameSetup : GameSetup):Observable<String>{
        console.log('about to invoke timer for GameSetup:', gameSetup);
        let timerRequest = this.setupGame(gameSetup);
        return this.httpClient.post<String>(this.global_admin.server_address, timerRequest).pipe(
            catchError(this.handleError<String>('invokeTimer'))
          );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
       
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
       
          // TODO: better job of transforming error for user consumption
          // this.log(`${operation} failed: ${error.message}`);
       
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

      setupGame(gameSetup : GameSetup):GameRequest{
        let gameRequest = new GameRequest();
        if(gameSetup.intervalTime !=null){
            
            let speakItems = this.buildIntervalSpeakTime(gameSetup.intervalTime, gameSetup.gameTime);
            gameRequest.speaktime=speakItems;  
        }
        if(gameSetup.endMessage!=null){
            let lastSpeakItem = this.setLastMessage(gameSetup.endMessage); 
            gameRequest.speaktime.push(lastSpeakItem);
        }
        if(gameSetup.startCountDown!=null){
            let countDownSpeakTime= this.setStartCountDownTimer(gameSetup.gameTime, gameSetup.startCountDown);
            gameRequest.speaktime.push(countDownSpeakTime);
        }
        gameRequest.minutes = String(gameSetup.gameTime + gameSetup.setupTime);
        gameRequest.speaktime = gameRequest.speaktime.concat(gameSetup.speakTimeList);

        return gameRequest;
      }

      buildIntervalSpeakTime(intervalTime: number, time : number):SpeakTime[]{
        let speakItems = [];
        // Add a speakItem for each interval
        let minutesRemaining = time;
        while(minutesRemaining > 0){
            let speakItem = new SpeakTime;
            let message = minutesRemaining + " minutes remaining. " + minutesRemaining + " minutes."
            speakItem.say = message;
            speakItem.time = String(minutesRemaining);
            speakItem.parms = '-s 120'
            speakItem.isInterval=true;
            speakItems.push(speakItem);
            minutesRemaining= minutesRemaining - intervalTime;
        }   
        return speakItems; 
      }

      setLastMessage(endMessage : string): SpeakTime{
        let speakItem = new SpeakTime();

        speakItem.time = '0:00';
        speakItem.say = endMessage;

        return speakItem;
      }

      setStartCountDownTimer(startTime: number, countDown:number): SpeakTime{
        let speakItem = new SpeakTime();
        let seconds = countDown >= 10 ? String(countDown) : '0' + countDown;

        
        speakItem.time = startTime + ':' + seconds;
        let countDownMessage = String(countDown); 
        for (let i = (countDown-1); i > 0; i--) {
            console.log("i = " + String(i));
            countDownMessage = countDownMessage.concat(", ")
            countDownMessage = countDownMessage.concat(String(i));
        }
        countDownMessage = countDownMessage.concat(".");

        speakItem.say = countDownMessage;
        speakItem.parms = '-s 110';

        return speakItem;
      }

      getSpeakTimeForGameNameAndTime(gameName:string, time:string):SpeakTime{
        
        let speaktime:SpeakTime = null;
        let gameSetup:GameSetup = null;
        this.global_admin.gameSetupList.forEach(item => {
          console.log("looping gameName=" + gameName);
          console.log("looping item name=" + item.gameName);
          
          if (gameName == item.gameName) {
            gameSetup = item;
            console.log(gameSetup);
          }
          if(gameSetup){
            // find speakItem that has this time:
            gameSetup.speakTimeList.forEach(currentSpeakTime => {
              if(currentSpeakTime.time == time){
                speaktime = currentSpeakTime;
              }
            });
          }
        });

        return speaktime;
      }


    }