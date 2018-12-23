import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { GameRequest } from '../entities/gameRequest';



@Injectable({
    providedIn: 'root'
})
export class TimerService {

    constructor(private httpClient: HttpClient) { }

    timerURL : string = "http://localhost:8080/timer"

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
    }