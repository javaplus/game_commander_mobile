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
            gameRequest.speaktime.speakItems = [];
            // Add a speakItem for each interval
            let counter = gameSetup.gameTime;
            while(counter > 0){
                counter= counter - gameSetup.intervalTime;                
                gameRequest.speaktime.speakItems.push(new SpeakItem);
            }
            
        }

        return gameRequest;
      }
    }