import { Injectable } from '@angular/core';
import { GameSetup } from '../entities/gameSetup';

@Injectable()
export class AdminGlobals {
  server_address: string = 'http://10.0.0.1:5000/timer';

  gameSetupList : GameSetup[] = [];
  
}