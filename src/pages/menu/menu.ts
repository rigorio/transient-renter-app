import {Component, ViewChild} from '@angular/core';
import {AlertController, MenuController, Nav, NavController, NavParams} from 'ionic-angular';
import {ListPage} from "../list/list";
import {SellPage} from "../sell/sell";
import {AccountPage} from "../account/account";
import {ReservationsPage} from "../reservations/reservations";
import {EditAccountPage} from "../edit-account/edit-account";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  templateUrl: 'menu.html',
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any }>;
  tab1Root = ListPage;
  tab3Root = ReservationsPage;
  tab4Root = AccountPage;

  constructor(public menu: MenuController,
              public storage: Storage,
              private alertCtrl: AlertController,
              public navParams: NavParams) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


}
