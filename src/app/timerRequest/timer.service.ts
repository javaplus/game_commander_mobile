import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GameRequest } from '../entities/gameRequest';
import { GameSetup } from '../entities/gameSetup';
import { SpeakTime } from '../entities/speakTime';
import { SpeakItem } from '../entities/speakItem';



@Injectable({
    providedIn: 'root'
})
export class TimerService {

    constructor(private httpClient: HttpClient) { }

    timerURL : string = "http://192.168.1.120:5000/timer"

    invokeTimer(timerRequest : GameRequest):Observable<String>{
        console.log('about to invoke timer:' + timerRequest);
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
        gameRequest.speaktime = new SpeakTime();
        if(gameSetup.intervalTime !=null){
            
            let speakItems = this.buildIntervalSpeakTime(gameSetup.intervalTime, gameSetup.gameTime);
            gameRequest.speaktime.speakItems =speakItems;
            
        }
        gameRequest.minutes = gameSetup.gameTime + gameSetup.setupTime;

        return gameRequest;
      }

      buildIntervalSpeakTime(intervalTime: number, time : number):SpeakItem[]{
        let speakItems = [];
        // Add a speakItem for each interval
        let minutesRemaining = time;
        while(minutesRemaining > 0){
            let speakItem = new SpeakItem;
            let message = minutesRemaining + " minutes remaining. " + minutesRemaining + " minutes."
            speakItem.say = message;
            speakItem.time = minutesRemaining;
            speakItems.push(speakItem);
            minutesRemaining= minutesRemaining - intervalTime;
        }   
        return speakItems; 
      }

    }