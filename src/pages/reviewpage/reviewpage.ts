import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Review} from "../create-item/Review";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";

@Component({
  selector: 'page-reviewpage',
  templateUrl: 'reviewpage.html',
})
export class ReviewpagePage {

  reviews: Review[];
  houseId: any;
  title: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController) {

    this.houseId = navParams.get('houseId');
    this.title = navParams.get('title');

    let url = Host.host + "/api/reviews/" + this.houseId;
    this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
      console.log(response);
      this.reviews = response.message;
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewpagePage');
  }

}
