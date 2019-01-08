import { Component, ViewChild, OnInit } from '@angular/core';
import { GameSetup } from '../entities/gameSetup';
import { AdminGlobals } from '../admin/admin-globals';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  ngOnInit() {
    console.log("OnInit called in Tabspage");
    
  }

  constructor(private storage: Storage, private global_admin: AdminGlobals){
    this.storage.forEach((value,key,iter)=>{
      console.log("key=" + key);
      console.log("value=", value);
      this.global_admin.gameSetupList.push(value);
      
    });
    this.global_admin.gameSetupList.forEach(item=>{
      console.log("name" + item.gameName);
      console.log("time" + item.gameTime);
    });
  }
  
  tabChanged(tabs){
    console.log("Tab changed", tabs);
    console.log("tab:", tabs.tabBar.selectedTab);
  /*  this.storage.forEach((value,key,iter)=>{
      console.log("key=" + key);
      console.log("value=", value);
      let gameSetup = new GameSetup();
      gameSetup.gameName = value.gameName;
      gameSetup.gameName = value.gameTime;
      gameSetup.endMessage = value.endMessage;
      gameSetup.setupTime = value.setupTime;

      this.global_admin.gameSetupList.push(gameSetup);
    });
    */
  }
  

}
