import {Component, ViewChild} from '@angular/core';
import {LoadingController, Nav, NavController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {ReservationsPage} from "../reservations/reservations";
import {LoginPage} from "../login/login";
import {EditAccountPage} from "../edit-account/edit-account";


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(
    public nav: NavController,
    public storage: Storage,
    public http: HttpClient,
    public loadingController: LoadingController) {

  }

  logout() {
    /*    let loading = this.loadingController.create({content:"Logging out..."});
        loading.present();
        this.storage.get("irent-token").then(token => {
          let url = Host.host + "/users/logout?token=" + token;
          this.http.get<string>(url).pipe().toPromise().then(_ => {
            this.storage.clear().then(r => {
              loading.dismissAll();
              this.navCtrl.setRoot(LoginPage);
            })
          })
        })*/
    this.storage.clear().then(_ => this.nav.setRoot(LoginPage))
  }

  viewReservations() {
    console.log("ha");
    this.nav.push(ReservationsPage);
    console.log("eh");
  }

  editAccount() {
    console.log("haaaa");
    this.nav.push(EditAccountPage);
    console.log("minahal kita agad");
  }
}
