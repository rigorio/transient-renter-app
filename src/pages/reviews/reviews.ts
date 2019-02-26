import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Reservation} from "../create-item/Reservation";
import {TSMap} from "typescript-map";
import {HttpClient} from "@angular/common/http";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {Storage} from "@ionic/storage";
import {ReservationsPage} from "../reservations/reservations";

@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})
export class ReviewsPage {
  score: number = 0;
  reservation: Reservation;
  review: string;

  constructor(public navCtrl: NavController,
              private http: HttpClient,
              private loadingController: LoadingController,
              private alertCtrl: AlertController,
              public storage: Storage,
              public navParams: NavParams) {

    this.reservation = navParams.get('reservation');
    console.log(this.reservation);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
  }

  finishReview() {
    console.log();
    let map = new TSMap();
    map.set('score', '' + this.score);
    map.set('review', this.review);
    map.set('houseId', this.reservation.houseId);
    map.set('reservationId', this.reservation.id);
    let message = map.toJSON();
    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/house/review?token=" + token;
      this.http.post<HttpResponse>(url, message, Host.httpOptions).pipe().toPromise()
        .then(response => {
          let alert = this.alertCtrl.create({
            title: response.status,
            message: response.message,
            buttons: ['Ok']
          });
          // add loading
          alert.present();
          this.navCtrl.pop();
        })
    })


  }
}
