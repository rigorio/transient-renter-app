import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {User} from "../edit-item/User";
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

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
    let contacts: string[] = [
      'a', 'b'
    ];
    this.user = new User(1, "rigo@email", "rigorei", contacts, false);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAccountPage');
  }

  addContact(contact: any) {

  }

  editContact() {

  }

  deleteContact() {

  }
}
