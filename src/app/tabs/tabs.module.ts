import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { SpeakentryComponent } from '../speakentry/speakentry.component';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
