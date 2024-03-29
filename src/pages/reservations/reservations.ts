import {Component, ViewChild} from '@angular/core';

import {AlertController, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';

import {HttpClient} from "@angular/common/http";

import {Storage} from "@ionic/storage";

import {Host} from "../host";

import {HttpResponse} from "../HttpResponse";

import {SelectItemPage} from "../select-item/select-item";
import {Reservation} from "../create-item/Reservation";
import {Transient} from "../create-item/Transient";
import {TSMap} from "typescript-map";


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

    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/reservations/houses?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        // console.log(response);
        this.reservations = response['message'];
        console.log(this.reservations);

        this.reservations.forEach(reservation => {
          reservation.stars = [];
          for (let i = 0; i < reservation.average; i++) {
            reservation.stars.push(i)
          }
        });
        console.log(this.reservations);


      })
    })
  }

  /**
   * refreshes the page
   */
  public wawUesugiKun() {

  }

  ionViewDidEnter() {
    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/reservations/houses?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        // console.log(response);
        this.reservations = response['message'];
        this.reservations.forEach(reservation => {
          reservation.stars = [];
          for (let i = 0; i < reservation.average; i++) {
            reservation.stars.push(i)
          }
        });
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


    let show = false;
    this.nav.push(SelectItemPage, {
      reservation: reservation,
      show: show,
      parent: this
    });
  }

  doRefresh(refresher) {
    this.storage.get('irent-token').then(token => {
      console.log("hatdog");
      let url = Host.host + "/api/reservations/houses?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        // console.log(response);
        console.log("hatdog 2");
        this.reservations = response['message'];
        console.log(this.reservations);
        this.reservations.forEach(reservation => {
          reservation.stars = [];
          for (let i = 0; i < reservation.average; i++) {
            reservation.stars.push(i)
          }
        });
      })

    });

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }
}
