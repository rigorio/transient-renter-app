import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the CreateItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})
export class CreateItemPage {

  transients: Array<{
    id: number, pics: string[], title: string, price: number, description: string,
    slots: number, vacant: number, reviews: number[], ownerId: number
  }> = [];
  item = true;
  title: any;
  price: any;
  description: any;
  vacant: any;
  slots: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateItemPage');
  }

  addImage() {

  }
}
