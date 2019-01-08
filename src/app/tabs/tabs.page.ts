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
    this.global_admin.gameSetupList = [];
    this.storage.forEach((value,key,iter)=>{
      console.log("key=" + key);
      console.log("value=", value);
      this.global_admin.gameSetupList.push(value);
    });
    
  }

  constructor(private storage: Storage, private global_admin: AdminGlobals){

  }
  gameSetupList : GameSetup[] = [];

  tabChanged(tabs){
    console.log("Tab changed", tabs);
    console.log("tab:", tabs.tabBar.selectedTab);
    
  }
  

}
