import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TSMap} from "typescript-map";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";

/**
 * Generated class for the CreateItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})
export class CreateItemPage {
  item = true;

  transients: Array<{
    title: string,
    description: string,
    pics: string[],
    slots: number,
    vacant: number,
    price: number,
    reviews: number[]
  }> = [];
  title: any;
  description: any;
  price: any;
  slots: any;
  vacant: any;
  reviews: string[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateItemPage');
  }

  addImage() {

  }

  createItem() {
    let loading = this.loadingController.create({content: "Creating Item..."});
    let map = new TSMap();
    let pics: string[] = [];
    map.set('title', this.title);
    map.set('description', this.description);
    // map.set('pics', this.pics) TODO HOW DO I UPLOAD PICS LOL
    map.set('pics', pics);
    map.set('slot', this.slots);
    map.set('vacant', this.vacant);
    map.set('price', this.price);
    map.set('reviews', this.reviews);

    this.storage.get('irent-token').then(token => {
      loading.present();
      let url = Host.host + "/api/houses?token=" + token;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post<HttpResponse>(url, map.toJSON(), httpOptions).pipe().toPromise().then(result => {
        loading.dismissAll();
        let alert = this.alertCtrl.create({
          title: result['status'],
          subTitle: result['message'],
          buttons: ['Ok']
        });
        // add loading
        alert.present();
      });
    })
  }
}
