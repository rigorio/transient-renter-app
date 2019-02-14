import {Component, ViewChild} from '@angular/core';

import {AlertController, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';

import {HttpClient} from "@angular/common/http";

import {Storage} from "@ionic/storage";

import {Host} from "../host";

import {HttpResponse} from "../HttpResponse";

import {SelectItemPage} from "../select-item/select-item";
import {Reservation} from "../create-item/Reservation";


@Component({
  selector: 'page-reservations',
  templateUrl: 'reservations.html',
})
export class ReservationsPage {
  reservations: Reservation[] = [];

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {
    console.log("heh");
    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/reservations/houses?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        console.log(response);
        this.reservations = response['message'];
      })
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservationsPage');
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
          let url = Host.host + "/api/reservations/houses?token=" + token;
          this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
            console.log(response);
            this.reservations = response['message'];
          })
        })
      })
    })

  }

  itemTapped(event, reservation) {
    console.log("but did it work?");
    let item: {
      id: number,
      title: string,
      description: string,
      coverPic: string,
      location: string,
      slots: number,
      price: number,
      reviews: number[]
    };
    item = {
      id: reservation.houseId,
      title: reservation.title,
      description: reservation.description,
      coverPic: reservation.coverPic,
      location: reservation.location,
      slots: reservation.slots,
      price: reservation.price,
      reviews: reservation.reviews
    };
    let show = false;
    this.nav.push(SelectItemPage, {
      item, show
    });
  }
}
