import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';
import {TSMap} from "typescript-map";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {SellPage} from "../sell/sell";

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  transient: {
    id: number;
    title: string;
    description: string;
    coverPic: string;
    location: string;
    slots: number;
    price: number;
    reviews: number[]
  };
  reservations: Array<{
    id: number,
    userId: number,
    houseId: number,
    arrival: string,
    departure: string,
    name: string,
    contacts: string[],
    coverPic: string,
    location: string,
    title: string,
    price: number,
    description: string,
    slots: number,
    reviews: number[]
  }>;
  coverPic: any;
  constructor(public nav: NavController,
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
    let loading = this.loadingController.create({content: "Saving Item..."});
    loading.present();
    let map = new TSMap();
    map.set('id', this.transient.id);
    map.set('coverPic', this.coverPic);
    map.set('title', this.transient.title);
    map.set('location', this.transient.location);
    map.set('price', this.transient.price);
    map.set('description', this.transient.description);
    map.set('slots', this.transient.slots);
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
      }).then(_ => this.nav.setRoot(SellPage));
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
  file: any;

  selectFile(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();
    this.getToken().then(token => {
      let url = Host.host + "/api/images?token=" + token;
      let formData = new FormData();
      formData.append('file', this.file);
      this.http.post(url, formData).pipe().toPromise().then(response => {
        console.log(response['message']);
        console.log(response);
        loading.dismissAll();
        this.coverPic = Host.host + "/api/images" + response['message'];
        console.log(this.coverPic);
        let alert = this.alertCtrl.create({
          title: response['status'],
          subTitle: response['message'],
          buttons: ['Ok']
        });
        // add loading
        alert.present();
      });
    });
  }
  private getToken() {
    return this.storage.get("irent-token");
  }
}