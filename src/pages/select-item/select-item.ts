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
  transients: Array<{
    id: number,
    title: string,
    description: string,
    pics: string[],
    slots: number,
    vacant: number,
    price: number,
    reviews: number[]
  }> = [];
  // because i don't know how to create an inner class
  id: number;
  title: string;
  description: string;
  pics: string[];
  slots: number;
  vacant: number;
  price: number;
  reviews: number[];
  averageReview: number;
  owner = new Owner();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();
    this.extractTransient(navParams);
    console.log(this.transients);

    let url = Host.host + "/api/houses/" + this.id + "/user";
    this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
      this.owner = response['message'];
    }).then(_ => loading.dismissAll());


  }

  private extractTransient(navParams: NavParams) {
    this.transients = navParams.get('items');
    this.id = this.transients[0].id;
    this.title = this.transients[0].title;
    this.description = this.transients[0].description;
    this.pics = this.transients[0].pics;
    this.slots = this.transients[0].slots;
    this.vacant = this.transients[0].vacant;
    this.price = this.transients[0].price;
    this.reviews = this.transients[0].reviews;
    this.averageReview = this.reviews[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectItemPage');
  }

}

class Owner {
  private _id: number;
  private _email: string;
  private _name: string;
  private _contacts: string[];

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get contacts(): string[] {
    return this._contacts;
  }

  set contacts(value: string[]) {
    this._contacts = value;
  }
}
