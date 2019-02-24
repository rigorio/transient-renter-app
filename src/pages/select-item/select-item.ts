import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpResponse} from "../HttpResponse";
import {Host} from "../host";
import {TSMap} from "typescript-map";
import {Transient} from "../create-item/Transient";
import {ReservationsPage} from "../reservations/reservations";
import {Reservation} from "../create-item/Reservation";
import {ListPage} from "../list/list";

@Component({
  selector: 'page-select-item',
  templateUrl: 'select-item.html',
})
export class SelectItemPage {
  show: boolean = true;
  checkIn: any;
  checkOut: any;

  transient: Transient;
  reservation: Reservation;
  averageReview: number = 0;
  owner: { id: number, email: string, name: string, contacts: string[] };
  departure: string;
  arrival: string;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {
    this.show = navParams.get("show");
    this.reservation = navParams.get("reservation");
    console.log(this.reservation);
    if (this.reservation != null) {
      this.checkIn = this.reservation.arrival;
      this.checkOut = this.reservation.departure;
      this.transient = new Transient(
        this.reservation.houseId,
        this.reservation.coverPic,
        this.reservation.title,
        this.reservation.propertyType,
        this.reservation.amenities,
        this.reservation.street,
        this.reservation.city,
        this.reservation.state,
        this.reservation.country,
        this.reservation.price,
        this.reservation.description,
        this.reservation.slots,
        this.reservation.reviews
      );
    } else {
      this.transient = navParams.get('item');
    }


    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();
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
      loading.dismissAll()
    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectItemPage');
  }

  book() {
    if (this.arrival == null || this.departure == null) {
      let alert = this.alertCtrl.create({
        title: "Please add Check In and Check Out date",
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
    console.log(this.departure);
    let stay = new TSMap();
    stay.set('arrival', this.arrival);
    stay.set('departure', this.departure);
    map.set('houseId', this.transient.id);
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
          this.nav.setRoot(ListPage);
        });
      })
    })

  }

  cancel() {
    this.storage.get("irent-token").then(token => {
      let url = Host.host + "/api/reservations/" + this.reservation.id + "?token=" + token;
      this.http.delete<HttpResponse>(url).pipe().toPromise().then(response => {
        let alert = this.alertCtrl.create({
          title: response.status,
          message: response.message,
          buttons: ['Ok']
        });
        // add loading
        alert.present();
        this.nav.pop();
      })
    })
  }
}

