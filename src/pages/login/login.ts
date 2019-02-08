import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Host} from "../host";
import {TSMap} from "typescript-map";
import {HttpResponse} from "../HttpResponse";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: any;
  password: any;
  registrantName: any;
  registrantEmail: any;
  registrantPassword: any;
  contact1: any;
  contact2: any;
  contact3: any;

  constructor(public nav: NavController,
              public storage: Storage,
              private http: HttpClient,
              public navParams: NavParams,
              private loadingController: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loading = this.loadingController.create({content: "Logging in..."});
    loading.present();
    // TODO
    let map = new TSMap();
    map.set('email', this.username);
    map.set('password', this.password);
    let message = map.toJSON();
    let url = Host.host + "/users/login";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<HttpResponse>(url, message, httpOptions).pipe()
      .toPromise().then(response => {
      loading.dismissAll();
      this.storage.set('irent-token', response['message']);
    }).then(_ => {
      this.nav.setRoot(MenuPage);
    })

  }

  register() {
    let loading = this.loadingController.create({content: "Registering...."});
    loading.present();
    let map = new TSMap();
    map.set('email', this.registrantEmail);
    map.set('name', this.registrantName);
    map.set('password', this.registrantPassword);
    let contacts: string[] = [];
    contacts.push(this.contact1);
    contacts.push(this.contact2);
    contacts.push(this.contact3);
    map.set('contacts', contacts);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = Host.host + "/users/register"
    let message = map.toJSON();

    this.http.post<HttpResponse>(url, message, httpOptions).pipe()
      .toPromise().then(response => {
        loading.dismissAll();
      let alert = this.alertCtrl.create({
        title: response['status'],
        subTitle: "Successfully registered!",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      console.log(response);
    });


  }
}
