import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpResponse} from "../HttpResponse";
import {Host} from "../host";
import {TSMap} from "typescript-map";

@IonicPage()
@Component({
  selector: 'page-select-item',
  templateUrl: 'select-item.html',
})
export class SelectItemPage {

  show: boolean = true;

  transient: {
    id: number,
    title: string,
    description: string,
    coverPic: string,
    pics: string[],
    slots: number,
    price: number,
    reviews: number[]
  };
  averageReview: number = 0;
  owner: { id: number, email: string, name: string, contacts: string[] };
  departure: any;
  arrival: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {
    this.show = navParams.get("show");

    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();
    this.transient = navParams.get('item');
    console.log(this.transient);
    this.owner = {
      id: 1,
      email: '',
      name: '',
      contacts: []
    };
    let url = Host.host + "/api/houses/" + this.transient.id + "/user";
    this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
      console.log(response);
      this.owner = response['message'];
    }).then(_ => {
      console.log(this.owner);
      loading.dismissAll()
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectItemPage');
  }

  book() {
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();
    let map = new TSMap();
    console.log(this.arrival);
    console.log(this.departure);
    map.set('arrival', this.arrival);
    map.set('departure', this.departure);
    map.set('houseId', this.transient.id);
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
        alert.present();
      })
    })

  }
}

