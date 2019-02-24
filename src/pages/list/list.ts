import {Component, ViewChild} from '@angular/core';
import {AlertController, LoadingController, ModalController, Nav, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpResponse} from "../HttpResponse";
import {Host} from "../host";
import {SelectItemPage} from "../select-item/select-item";
import {Transient} from "../create-item/Transient";
import {FilterPage} from "../filter/filter";

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
  minPrice = 0;
  maxPrice = 0;
  slots: any;
  amenities: string[] = [];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {

    let loading = this.loadingController.create({content: "Fetching Items..."});
    loading.present();
    let url = Host.host + "/api/houses";
    this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
      loading.dismissAll();
      this.transients = response['message'];
    }).then(_ => {
      let tempTransients: Transient[];
      tempTransients = this.transients;
      console.log(tempTransients);
      this.keyword = this.navParams.get("keyword");
      if (this.keyword != null) {
        tempTransients = tempTransients.filter(transient => {
          return this.lc(transient.title).includes(this.lc(this.keyword)) ||
            this.lc(transient.country).includes(this.lc(this.keyword)) ||
            this.lc(transient.city).includes(this.lc(this.keyword)) ||
            this.lc(transient.state).includes(this.lc(this.keyword)) ||
            this.lc(transient.street).includes(this.lc(this.keyword))
        });
        console.log(tempTransients);
      }
      this.propertyType = this.navParams.get("propertyType");
      console.log("eh " + this.propertyType != null);
      if (this.propertyType != null) {
        console.log(this.transients);
        console.log("ehhh??");
        tempTransients = tempTransients.filter(transient => {
          return transient.propertyType == this.propertyType;
        });
        console.log(tempTransients);
      }
      this.minPrice = this.navParams.get("minPrice");
      this.maxPrice = this.navParams.get("maxPrice");
      console.log(this.minPrice + " aha " + this.maxPrice);
      if (this.minPrice != null || this.maxPrice != null) {
        if (this.minPrice != 0 && this.maxPrice != 0) {

          console.log("woat");
          tempTransients = tempTransients.filter(transient => {

            let b = transient.price <= this.maxPrice;
            let b1 = transient.price >= this.minPrice;
            // console.log(b + " bbbb " + b1);
            let b2 = b && b1;
            // console.log("b2 " + b2);
            return b2;
          });
        }
      }
      this.slots = this.navParams.get("slots");
      if (this.slots != null) {
        tempTransients = tempTransients.filter(transient => {
          return transient.slots >= this.slots;
        });
      }
      this.amenities = this.navParams.get("amenities");
      if (this.amenities != null && this.amenities.length > 0) {
        for (let amenity of this.amenities) {
          console.log(amenity);
          tempTransients = tempTransients.filter(transient => {
            return transient.amenities.indexOf(amenity) > -1;
          });
        }
      }
      this.transients = tempTransients;
      // if (tempTransients != null && tempTransients.length > 0)
      //   this.transients = tempTransients;
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

  addFilter() {
    this.nav.push(FilterPage);
  }

  clear() {
    let loading = this.loadingController.create({content: "Loading..."});
    let url = Host.host + "/api/houses";
    loading.present();
    this.keyword = "";
    this.propertyType = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.slots = null;
    this.amenities = null;
    this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
      loading.dismissAll();
      this.transients = response['message'];
    })
  }
}
