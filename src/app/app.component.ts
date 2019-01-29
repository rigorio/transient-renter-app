import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {Storage} from "@ionic/storage";
import {HttpClient} from "@angular/common/http";
import {HttpResponse} from "../pages/HttpResponse";
import {Host} from "../pages/host";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;
  owner: Array<{ id: number, email: string, name: string, contacts: string[] }> = [];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public http: HttpClient, public storage: Storage) {
    let token = 'c9fb5827-e683-4936-a799-9d973af6cdca';
    storage.set('irent-token', token);
    storage.get("irent-token").then(token => {
      let url = Host.host + "/users/id?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        storage.set('owner-id', response['message'])
      })
    });
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
