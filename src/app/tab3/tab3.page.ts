import { Component } from '@angular/core';
import { AdminGlobals } from '../admin/admin-globals';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  constructor(private global_admin: AdminGlobals){}

  updateAdmin(){
    console.log("updated");
  }
}
