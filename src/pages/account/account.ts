import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {ReservationsPage} from "../reservations/reservations";


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  search: any;

  constructor(public navCtrl: NavController,
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
  }

  viewReservations() {
    console.log("ha");
    this.navCtrl.push(ReservationsPage);

  }

  editAccount() {

  }
}
