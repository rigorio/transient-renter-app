import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {MenuPage} from "../pages/menu/menu";
import {SellPage} from "../pages/sell/sell";
import {AccountPage} from "../pages/account/account";
import {CreateItemPage} from "../pages/create-item/create-item";
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule} from "@ionic/storage";
import {SelectItemPage} from "../pages/select-item/select-item";
import {EditItemPage} from "../pages/edit-item/edit-item";
import {ReservationsPage} from "../pages/reservations/reservations";

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    ListPage,
    LoginPage,
    MenuPage,
    SellPage,
    CreateItemPage,
    SelectItemPage,
    EditItemPage,
    ReservationsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    ListPage,
    LoginPage,
    MenuPage,
    SellPage,
    CreateItemPage,
    SelectItemPage,
    EditItemPage,
    ReservationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
