import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, NavController, NavParams} from 'ionic-angular';
import {ListPage} from "../list/list";
import {SellPage} from "../sell/sell";
import {AccountPage} from "../account/account";

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

  rootPage = ListPage;
  pages: Array<{title: string, component: any}>;


  constructor(public navCtrl: NavController,
              public menu: MenuController,
              public navParams: NavParams) {

    this.pages = [
      { title: 'Listings', component: ListPage },
      { title: 'My Listings', component: SellPage },
      { title: 'Account', component: AccountPage }
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }


  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
