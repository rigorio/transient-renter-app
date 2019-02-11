import {Component, ViewChild} from '@angular/core';
import {AlertController, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpResponse} from "../HttpResponse";
import {Host} from "../host";
import {SelectItemPage} from "../select-item/select-item";
import {Transient} from "../create-item/Transient";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  transients: Transient[] = [];
  owner: Array<{ id: number, email: string, name: string, contacts: string[] }> = [];

  keyword: string;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage,
    private loadingController: LoadingController,
    private alertCtrl: AlertController
  ) {

    let loading = this.loadingController.create({content: "Fetching Items..."});
    loading.present();
    let url = Host.host + "/api/houses";
    this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
      loading.dismissAll();
      this.transients = response['message'];
    });

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    let show = true;
    this.nav.push(SelectItemPage, {
      item,
      show
    });
  }


  search() {
    let loading = this.loadingController.create({content: "Loading..."});
    console.log(this.keyword);
    let url = Host.host + "/api/houses";
    loading.present();
    this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
      loading.dismissAll();
      this.transients = response['message'];
    }).then(_ => {
      if (this.keyword.length > 0) {
        this.transients = this.transients.filter(transient => {
          return this.lc(transient.title).includes(this.lc(this.keyword)) ||
            this.lc(transient.country).includes(this.lc(this.keyword)) ||
            this.lc(transient.city).includes(this.lc(this.keyword)) ||
            this.lc(transient.state).includes(this.lc(this.keyword)) ||
            this.lc(transient.street).includes(this.lc(this.keyword))
        });
      }
    });
  }

  lc(s: string) {
    return s.toLowerCase();
  }
}
