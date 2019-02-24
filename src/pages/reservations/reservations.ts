import {Component, ViewChild} from '@angular/core';

import {AlertController, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';

import {HttpClient} from "@angular/common/http";

import {Storage} from "@ionic/storage";

import {Host} from "../host";

import {HttpResponse} from "../HttpResponse";

import {SelectItemPage} from "../select-item/select-item";
import {Reservation} from "../create-item/Reservation";
import {Transient} from "../create-item/Transient";


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

  /**
   * refreshes the page
   */
  public wawUesugiKun() {

  }

  ionViewDidEnter() {
    console.log("totoo?");
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
    let transient = new Transient(
      reservation.houseId,
      reservation.coverPic,
      reservation.title,
      reservation.propertyType,
      reservation.amenities,
      reservation.street,
      reservation.city,
      reservation.state,
      reservation.country,
      reservation.price,
      reservation.description,
      reservation.slots,
      reservation.reviews
    );

    let show = false;
    this.nav.push(SelectItemPage, {
      reservation: reservation,
      show: show,
      parent: this
    });
  }
}
