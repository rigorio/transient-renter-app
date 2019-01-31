import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TSMap} from "typescript-map";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  transient: { id: number; title: string; description: string; pics: string[]; slots: number; price: number; reviews: number[] };
  reservations: Array<{
    id: number,
    userId: number,
    houseId: number,
    arrival: string,
    departure: string,
    name: string,
    contacts: string[],
    coverPic: string,
    pics: string[],
    title: string,
    price: number,
    description: string,
    slots: number,
    reviews: number[]
  }>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {
    this.transient = navParams.get("transient");
    this.reservations = [];

    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/reservations/users/" + this.transient.id + "?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        console.log(response);
        this.reservations = response['message'];
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');
  }

  editItem() {
    let loading = this.loadingController.create({content: "Creating Item..."});
    loading.present();
    let map = new TSMap();
    let pics: string[] = [];
    map.set('id', this.transient.id);
    map.set('title', this.transient.title);
    map.set('description', this.transient.description);
    // map.set('pics', this.pics) TODO HOW DO I UPLOAD PICS LOL
    map.set('pics', pics);
    map.set('slots', this.transient.slots);
    map.set('price', this.transient.price);
    map.set('reviews', this.transient.reviews);
    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/houses?token=" + token;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.put<HttpResponse>(url, map.toJSON(), httpOptions).pipe().toPromise().then(result => {
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

  addImage() {

  }

  delete(reservation) {
    let loading = this.loadingController.create({content: "Creating Item..."});
    loading.present();
    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/reservations/" + reservation.id + "?token=" + token;
      this.http.delete(url).pipe().toPromise().then(response => {
        loading.dismissAll();
        let alert = this.alertCtrl.create({
          title: response['status'],
          subTitle: response['message'],
          buttons: ['Ok']
        });
        // add loading
        alert.present();
      }).then(_ => {
        this.storage.get('irent-token').then(token => {
          let url = Host.host + "/api/reservations/users/" + this.transient.id + "?token=" + token;
          this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
            console.log(response);
            this.reservations = response['message'];
          })
        })
      })
    })

  }
}
