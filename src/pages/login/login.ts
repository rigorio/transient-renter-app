import {Component, ViewChild} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  MenuController,
  Nav,
  NavController,
  NavParams
} from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Host} from "../host";
import {TSMap} from "typescript-map";
import {HttpResponse} from "../HttpResponse";
import {Storage} from "@ionic/storage";
import {RegisterPage} from "../register/register";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: any;
  password: any;


  constructor(public nav: NavController,
              public storage: Storage,
              private http: HttpClient,
              private loadingController: LoadingController,
              public menu: MenuController,
              private alertCtrl: AlertController) {
    // this.menu.enable(false, 'leftMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loading = this.loadingController.create({content: "Logging in..."});

    if (this.username == null || this.password == null) {
      let alert = this.alertCtrl.create({
        title: "Username or password cannot be blank",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }

    console.log("ha");
    loading.present();
    this.fetchLogin().pipe().toPromise().then(response => {
      loading.dismissAll();

      let responseElement = response['status'];
      console.log(responseElement);
      let b = responseElement == "Success";
      console.log(b);
      if (b) {
        this.storage.set('irent-token', response['message']).then(_ => {
          this.nav.setRoot(MenuPage);
        });
      } else {
        let alert = this.alertCtrl.create({
          title: response['status'],
          message: response['message'],
          buttons: ['Ok']
        });
        // add loading
        alert.present();
      }

    })

  }

  fetchLogin() {
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
    return this.http.post<HttpResponse>(url, message, httpOptions);
  }

  register() {
    this.nav.push(RegisterPage);
  }

}
