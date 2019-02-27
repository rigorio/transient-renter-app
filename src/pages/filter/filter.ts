import {Component} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ListPage} from "../list/list";

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
  minPrice = 0;
  maxPrice = 0;
  slots: any;
  amenity: any;
  amenities: string[] = [];
  rating: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }

  search() {
    console.log(this.propertyType);
    this.navCtrl.setRoot(ListPage, {
      keyword: this.keyword,
      propertyType: this.propertyType,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      slots: this.slots,
      amenities: this.amenities,
      rating: this.rating
    });
  }

  addAmenity(amenity) {
    if (amenity == null || amenity.length < 3) {
      let alert = this.alertCtrl.create({
        title: "Must be at least 3 characters",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }
    console.log(amenity);
    this.amenities.push(amenity);
    console.log(this.amenities);
    this.amenity = "";
  }

  deleteAmenity(amenity) {
    let index = this.amenities.indexOf(amenity);
    this.amenities.splice(index, 1);
  }
}
