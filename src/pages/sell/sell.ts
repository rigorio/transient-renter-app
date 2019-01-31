import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {CreateItemPage} from "../create-item/create-item";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {EditItemPage} from "../edit-item/edit-item";

/**
 * Generated class for the SellPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {
  transients: Array<{
    id: number,
    title: string,
    description: string,
    pics: string[],
    slots: number,
    vacant: number,
    price: number,
    reviews: number[]
  }> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {

    storage.get("irent-token").then(token => {
      console.log(token);
      let url = Host.host + "/api/account/houses?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        console.log(response);
        this.transients = response['message'];
      })
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellPage');
  }

  createItem() {
    this.navCtrl.push(CreateItemPage);
  }

  itemTapped($event, transient) {
    this.navCtrl.push(EditItemPage, {
      transient
    });
  }
}
