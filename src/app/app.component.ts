import {Component, ViewChild} from '@angular/core';
import {LoadingController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {MenuPage} from "../pages/menu/menu";
import {Host} from "../pages/host";
import {HttpResponse} from "../pages/HttpResponse";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  // rootPage = LoginPage;
  // rootPage = MenuPage;
  owner: Array<{ id: number, email: string, name: string, contacts: string[] }> = [];

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public http: HttpClient,
              public storage: Storage,
              public loadingController: LoadingController) {
    // storage.clear();
    // storage.set('irent-token', '485404b0-8a68-4c6f-97a8-345dea5b2315').then(_=> {

    storage.get('irent-token').then(token => {
      console.log("hatdog");
      console.log(token);
      if (token == null) {
        this.rootPage = LoginPage;
      } else {
        let url = Host.host + "/api/valid?token=" + token;
        this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
          if (response.message == false)
            this.rootPage = LoginPage;
          else if (response.message == true)
            this.rootPage = MenuPage;
        })
      }
    })
    // });
    // let loading = loadingController.create({content: "Please wait..."});
    // // loading.present();
    // //     loading.dismissAll();
    // storage.clear();
    // let token = 'c79c240f-4d6b-4c5a-a455-1b6cebe5f90e';
    // storage.set('irent-token', token);
    // storage.get("irent-token").then(token => {
    //   let url = Host.host + "/users/id?token=" + token;
    //   this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
    //     console.log(response);
    //     storage.set('owner-id', response['message'])
    //   })
    // });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
