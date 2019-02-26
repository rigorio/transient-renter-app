import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {User} from "../edit-item/User";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {TSMap} from "typescript-map";

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html',
})
export class EditAccountPage {
  contact: any;
  user: User;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController) {
    this.user = new User(0, 'n/a', 'n/a', null, false);

    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/users?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        console.log(response);
        this.user = response.message;
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  addContact(contact: string) {
    if (contact == null || contact.length < 4) {
      let alert = this.alertCtrl.create({
        title: "Must be at least 4 characters",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }
    console.log(contact);
    this.user.contacts.push(contact);
    console.log(this.user.contacts);
    this.contact = "";
  }

  editContact() {

  }


  deleteContact(contact) {
    let index = this.user.contacts.indexOf(contact);
    this.user.contacts.splice(index, 1);
  }


  save() {
    let loading = this.loadingController.create({content: "Please wait...."});
    let map = new TSMap();
    map.set('name', this.user.name);
    map.set('email', this.user.email);
    map.set('contacts', this.user.contacts);
    let message = map.toJSON();
    loading.present();
    this.storage.get('irent-token').then(token => {
      loading.dismissAll();
      let url = Host.host + "/users?token=" + token;
      this.http.put<HttpResponse>(url, message, Host.httpOptions).pipe().toPromise().then(response => {
        let alert = this.alertCtrl.create({
          title: response['status'],
          subTitle: "Details were saved",
          buttons: ['Ok']
        });
        // add loading
        alert.present();
        console.log(response);
        return;
      });
    })
    loading.dismissAll();
  }
}
