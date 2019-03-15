import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ListPage} from "../list/list";
import {HttpResponse} from "../HttpResponse";
import {Host} from "../host";
import {HttpClient} from "@angular/common/http";

/**
 * Generated class for the FilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  keyword: any;
  propertyType: any;
  minPrice: number;
  maxPrice: number;
  slots: any;
  amenity: any;
  amenities: string[] = [];
  rating: number;
  amenns: string[];
  amenn: any;
  sortedRating: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private alertCtrl: AlertController) {
    this.amenities = [];
    this.http.get<HttpResponse>(Host.host + "/api/amenities").pipe().toPromise().then(response => {
      console.log(response);
      this.amenns = response.message;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  search() {
    console.log(this.minPrice + " --- " + this.maxPrice);
    console.log(this.maxPrice < this.minPrice);
    if (this.maxPrice < this.minPrice) {
      let alert = this.alertCtrl.create({
        subTitle: "Maximum price cannot be lower then minimum price",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }


    this.navCtrl.setRoot(ListPage, {
      keyword: this.keyword,
      propertyType: this.propertyType,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      slots: this.slots,
      amenities: this.amenities,
      rating: this.rating,
      sortedRating: this.sortedRating
    });
  }

  addAmenity() {
    if (this.amenn == null) {
      let alert = this.alertCtrl.create({
        subTitle: "Please select an amenity from the list",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }
    if (!(this.amenities.indexOf(this.amenn) > -1))
      this.amenities.push(this.amenn);
    this.amenity = "";

  }

  deleteAmenity(amenity) {
    let index = this.amenities.indexOf(amenity);
    this.amenities.splice(index, 1);
  }
}
