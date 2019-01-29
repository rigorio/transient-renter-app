import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectItemPage } from './select-item';

@NgModule({
  declarations: [
    SelectItemPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectItemPage),
  ],
})
export class SelectItemPageModule {}
