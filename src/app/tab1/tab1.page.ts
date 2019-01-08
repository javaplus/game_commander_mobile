import { Component } from '@angular/core';
import { AdminGlobals } from '../admin/admin-globals';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(private globals: AdminGlobals){}
  message : string = "Tab1 Game Commander!!!";

  editThis(something:string){}
}
