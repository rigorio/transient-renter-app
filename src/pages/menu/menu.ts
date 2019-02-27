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

  rootPage = ListPage;
  pages: Array<{ title: string, component: any }>;


  constructor(public menu: MenuController,
              public storage: Storage,
              private alertCtrl: AlertController,
              public navParams: NavParams) {


    this.pages = [
      {title: 'Listings', component: ListPage},
      {title: 'My Listings', component: SellPage},
      {title: 'My Reservations', component: ReservationsPage},
      {title: 'Edit Account', component: EditAccountPage}
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

  logout() {

    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.storage.clear().then(_ => this.nav.setRoot(LoginPage))

            //kore
          }
        }
      ]
    });

    alert.present();
  }
}
