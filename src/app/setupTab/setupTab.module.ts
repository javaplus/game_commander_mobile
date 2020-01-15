import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SetupTabPage } from './setupTab.page';
import { HttpClientModule } from '@angular/common/http';
import { SpeakentryComponent } from '../speakentry/speakentry.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: SetupTabPage }]),
    HttpClientModule
  ],
  declarations: [SetupTabPage, SpeakentryComponent]
})
export class SetupTabPageModule {}
