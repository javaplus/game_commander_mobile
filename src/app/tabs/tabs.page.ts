import { Component, ViewChild } from '@angular/core';
import { GameSetup } from '../entities/gameSetup';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {


@ViewChild('myTabs') tabRef: IonTabs;


  gameSetupList : GameSetup[] = [];

  tabChanged(tabs){
    console.log("Tab changed", tabs);
    console.log("tab:", tabs.tabBar.selectedTab);
    
  }
  

}
