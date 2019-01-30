import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpResponse} from "../HttpResponse";
import {Host} from "../host";

@IonicPage()
@Component({
  selector: 'page-select-item',
  templateUrl: 'select-item.html',
})
export class SelectItemPage {
  transient: {
    id: number,
    title: string,
    description: string,
    pics: string[],
    slots: number,
    price: number,
    reviews: number[]
  };
  averageReview: number = 0;
  owner: { id: number, email: string, name: string, contacts: string[] };
  date: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {

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

  }
}

