import {Component, ViewChild} from '@angular/core';
import {LoadingController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;
  owner: Array<{ id: number, email: string, name: string, contacts: string[] }> = [];

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public http: HttpClient,
              public storage: Storage,
              public loadingController: LoadingController) {
    storage.clear();
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
