import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TSMap} from "typescript-map";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registrantEmail: any;
  registrantPassword: any;

  contacts: string[];
  contact: any;
  confirmPassword: any;
  lastName: any;
  firstName: any;

  constructor(public navCtrl: NavController,
              private http: HttpClient,
              private loadingController: LoadingController,
              private alertCtrl: AlertController) {
    this.contacts = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

  register() {
    let loading = this.loadingController.create({content: "Registering...."});

    if (this.nullCheck() == false)
      return;

    loading.present();
    this.fetchRegister().pipe()
      .toPromise().then(response => {
      loading.dismissAll();
      let alert = this.alertCtrl.create({
        title: response['status'],
        subTitle: "Please check your email and confirm your registration",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      if (response.status == "Success") {
        this.navCtrl.setRoot(LoginPage);
      }
      console.log(response);
    });

  }

  nullCheck() {
    if (this.firstName == null) {
      this.cannotBeBlank("First Name");
      return false;
    }
    if (this.firstName.length < 2) {
      let alert = this.alertCtrl.create({
        subTitle: "First Name must be more than 1 character",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return false;
    }
    if (this.lastName == null) {
      this.cannotBeBlank("First Name");
      return false;
    }
    if (this.lastName.length < 2) {
      let alert = this.alertCtrl.create({
        subTitle: "Last Name must be more than 1 character",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return false;
    }
    if (this.hasNumber(this.firstName) || this.hasNumber(this.lastName)) {
      let alert = this.alertCtrl.create({
        subTitle: "Name cannot contain numbers",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return false;
    }
    if (this.registrantEmail == null) {
      this.cannotBeBlank("Email");
      return false;
    }
    if (this.registrantPassword == null) {
      this.cannotBeBlank("Password");
      return false;
    }
    if (this.registrantPassword.length < 8) {
      let alert = this.alertCtrl.create({
        subTitle: "Password must be at least than 8 characters",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return false;
    }
    if (this.registrantPassword != this.confirmPassword) {
      let alert = this.alertCtrl.create({
        subTitle: "Passwords did not match",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return false;
    }
    return true;
  }

  cannotBeBlank(name) {
    let alert = this.alertCtrl.create({
      subTitle: name + " cannot be blank",
      buttons: ['Ok']
    });
    // add loading
    alert.present();
  }

  fetchRegister() {
    let map = new TSMap();
    map.set('email', this.registrantEmail);
    map.set('firstName', this.firstName);
    map.set('lastName', this.lastName);
    map.set('password', this.registrantPassword);
    map.set('contacts', this.contacts);
    let message = map.toJSON();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let url = Host.host + "/users/register";
    return this.http.post<HttpResponse>(url, message, httpOptions);
  }


  deleteContact(contact) {
    let index = this.contacts.indexOf(contact);
    this.contacts.splice(index, 1);
  }

  addContact(contact: string) {
    if (contact == null || contact.length < 4) {
      let alert = this.alertCtrl.create({
        subTitle: "Must be at least 4 characters",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }
    console.log(contact);
    this.contacts.push(contact);
    console.log(this.contacts);
    this.contact = "";
  }

  login() {
    this.navCtrl.push(LoginPage);
  }
}
