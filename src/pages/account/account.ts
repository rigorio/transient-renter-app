import {Component, ViewChild} from '@angular/core';
import {AlertController, App, LoadingController, Nav, NavController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {ReservationsPage} from "../reservations/reservations";
import {LoginPage} from "../login/login";
import {EditAccountPage} from "../edit-account/edit-account";
import {SellPage} from "../sell/sell";


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(
    public nav: NavController,
    public storage: Storage,
    public http: HttpClient,
    private alertCtrl: AlertController,
    private app: App,
    public loadingController: LoadingController) {

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
            this.storage.clear().then(_ => {
              this.app.getRootNav().setRoot(LoginPage);
              // document.getElementById("tabs").style.display="None";
              // this.nav.setRoot(LoginPage)
            })

            //kore
          }
        }
      ]
    });

    alert.present();
  }

  viewReservations() {
    this.nav.push(SellPage);
  }

  editAccount() {
    this.nav.push(EditAccountPage);
  }
}
