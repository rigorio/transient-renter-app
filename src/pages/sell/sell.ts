import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';
import {CreateItemPage} from "../create-item/create-item";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {EditItemPage} from "../edit-item/edit-item";
import {Transient} from "../create-item/Transient";

@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {

  transients: Transient[];

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {

    storage.get("irent-token").then(token => {
      let url = Host.host + "/api/account/houses?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        this.transients = response['message'];
        console.log(this.transients);
        this.transients.forEach(transient => {
          transient.stars = [];
          for (let i = 0; i < transient.average; i++) {
            transient.stars.push(i)
          }
        });

        console.log(this.transients);

      })
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellPage');
  }

  createItem() {
    this.nav.push(CreateItemPage);
  }

  itemTapped($event, transient) {
    this.nav.push(EditItemPage, {
      transient
    });
  }

  doRefresh(refresher) {

    this.storage.get("irent-token").then(token => {
      let url = Host.host + "/api/account/houses?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        this.transients = response['message'];
        console.log(this.transients);
        this.transients.forEach(transient => {
          transient.stars = [];
          for (let i = 0; i < transient.average; i++) {
            transient.stars.push(i)
          }
        });

        console.log(this.transients);

      })
    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }
}
