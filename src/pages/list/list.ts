import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {HttpResponse} from "../HttpResponse";
import {Host} from "../host";
import {SelectItemPage} from "../select-item/select-item";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  transients: Array<{
    id: number,
    title: string,
    description: string,
    pics: string[],
    slots: number,
    vacant: number,
    price: number,
    reviews: number[]
  }> = [];
  owner: Array<{ id: number, email: string, name: string, contacts: string[] }> = [];

  keyword: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController
  ) {

    let loading = this.loadingController.create({content: "Fetching Items..."});
    let url = Host.host + "/api/houses";
    loading.present();
    this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
      this.transients = response['message'];
      console.log(this.transients);
      loading.dismissAll();
    });

  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    let items = [];
    items.push(item);
    console.log(item);
    this.navCtrl.push(SelectItemPage,{
      items
    });
  }


}
