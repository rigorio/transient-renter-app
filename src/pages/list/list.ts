import {Component, ViewChild} from '@angular/core';
import {AlertController, LoadingController, ModalController, Nav, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpResponse} from "../HttpResponse";
import {Host} from "../host";
import {SelectItemPage} from "../select-item/select-item";
import {Transient} from "../create-item/Transient";
import {FilterPage} from "../filter/filter";
import {LoginPage} from "../login/login";
import {TSMap} from "typescript-map";

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

  propertyType: any;
  minPrice: number;
  maxPrice: number;
  slots: any;
  amenities: string[] = [];
  rating: number = 1;
  sortedRating: string;
  pattern = "[A-Za-z]";

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {

    let url = Host.host + "/api/houses/filter";
    console.log("dito ba?");
    this.keyword = this.navParams.get("keyword");
    this.propertyType = this.navParams.get("propertyType");
    this.minPrice = this.navParams.get("minPrice");
    this.maxPrice = this.navParams.get("maxPrice");
    this.amenities = this.navParams.get("amenities");
    this.slots = this.navParams.get("slots");
    this.rating = this.navParams.get('rating');
    this.sortedRating = this.navParams.get('sortedRating');
    let map = new TSMap();
    map.set('keyword', this.keyword);
    map.set('propertyType', this.propertyType);
    map.set('minPrice', this.minPrice);
    map.set('maxPrice', this.maxPrice);
    map.set('slots', this.slots);
    map.set('rating', this.rating);
    map.set('amenities', this.amenities);
    map.set('sortedRating', this.sortedRating);
    console.log("oo dito");
    let message = map.toJSON()
    this.http.post<HttpResponse>(url, message, Host.httpOptions).pipe().toPromise().then(response => {
      console.log(response);
      this.transients = response['message'];
      console.log(this.transients);
    }).then(_ => {
      this.transients.forEach(transient => {
        transient.stars = [];
        for (let i = 0; i < transient.average; i++) {
          transient.stars.push(i)
        }
      });

      console.log(this.transients);

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
    let url = Host.host + "/api/houses/filter";
    let map = new TSMap();
    if (this.keyword.length > 0)
      map.set('keyword', this.keyword);
    let message = map.toJSON();
    loading.present();
    this.http.post<HttpResponse>(url, message, Host.httpOptions).pipe().toPromise().then(response => {
      loading.dismissAll();
      console.log(response);
      this.transients = response['message'];
    }).then(_ => {
      this.transients.forEach(transient => {
        transient.stars = [];
        for (let i = 0; i < transient.average; i++) {
          transient.stars.push(i)
        }
      });

      console.log(this.transients);

    });
  }

  lc(s: string) {
    return s.toLowerCase();
  }

  addFilter() {
    this.nav.push(FilterPage);
  }

  clear() {
    this.nav.setRoot(ListPage);
    // let loading = this.loadingController.create({content: "Loading..."});
    // let url = Host.host + "/api/houses";
    // loading.present();
    // this.keyword = "";
    // this.propertyType = null;
    // this.minPrice = null;
    // this.maxPrice = null;
    // this.slots = null;
    // this.amenities = null;
    // this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
    //   loading.dismissAll();
    //   this.transients = response['message'];
    // })
  }


  doRefresh(refresher) {
    let map = new TSMap();
    console.log("oo dito");
    let url = Host.host + "/api/houses/filter";
    let message = map.toJSON();
    this.http.post<HttpResponse>(url, message, Host.httpOptions).pipe().toPromise().then(response => {
      console.log(response);
      this.transients = response['message'];
      console.log(this.transients);
    }).then(_ => {
      this.transients.forEach(transient => {
        transient.stars = [];
        for (let i = 0; i < transient.average; i++) {
          transient.stars.push(i)
        }
      });

      console.log(this.transients);
      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 500);
    });
  }
}
