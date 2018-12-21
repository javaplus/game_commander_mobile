import { Component } from '@angular/core';
import { GameRequest } from '../entities/gameRequest';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  gameRequest : GameRequest = new GameRequest(); 

  submitTime():void{
    console.log("gameTime=" + this.gameRequest.gameTime);
  }
}
