import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GameRequest } from '../entities/gameRequest';
import { GameSetup } from '../entities/gameSetup';
import { SpeakTime } from '../entities/speakTime';



@Injectable({
    providedIn: 'root'
})
export class TimerService {

    constructor(private httpClient: HttpClient) { }

    timerURL : string = "http://192.168.1.120:5000/timer"

    invokeTimer(timerRequest : GameRequest):Observable<String>{
        console.log('about to invoke timer:', timerRequest);
        return this.httpClient.post<String>(this.timerURL, timerRequest).pipe(
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
        gameRequest.minutes = String(gameSetup.gameTime + gameSetup.setupTime);

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

    }