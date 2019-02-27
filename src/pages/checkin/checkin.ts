import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TSMap} from "typescript-map";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {ListPage} from "../list/list";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-checkin',
  templateUrl: 'checkin.html',
})
export class CheckinPage {
  longTerm: boolean;
  departure: string;
  arrival: string;
  houseId: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController) {
    this.houseId = this.navParams.get('houseId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckinPage');
  }

  book() {
    if (this.arrival == null) {
      let alert = this.alertCtrl.create({
        title: "Please add Check In. If you wish to stay for an indefinite amount of time, leave the Check Out blank.",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }

    if (this.departure < this.arrival) {
      let alert = this.alertCtrl.create({
        title: "Please make sure your Check Out is not before your Check In",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }

    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();
    let map = new TSMap();
    console.log(this.arrival);
    let stay = new TSMap();
    stay.set('checkIn', this.arrival);
    // if (this.checkOut != null)
    if (this.longTerm)
      this.departure = undefined;
    console.log(this.departure);
    stay.set('checkOut', this.departure);
    map.set('houseId', this.houseId);
    map.set('stay', stay.toJSON());
    let message = map.toJSON();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.storage.get("irent-token").then(token => {
      let url = Host.host + "/api/reservations?token=" + token;
      this.http.post<HttpResponse>(url, message, httpOptions).pipe().toPromise().then(response => {
        loading.dismissAll();
        let alert = this.alertCtrl.create({
          title: response['status'],
          subTitle: response['message'],
          buttons: ['Ok']
        });
        // add loading
        alert.present().then(what => {
          this.nav.pop()
        });
      })
    })

  }
}
