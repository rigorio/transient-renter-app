import {Component, ViewChild} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AlertController, IonicPage, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TSMap} from "typescript-map";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {SellPage} from "../sell/sell";
import {ImagePickerOptions} from "@ionic-native/image-picker";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {FileChooser} from "@ionic-native/file-chooser";

/**
 * Generated class for the CreateItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})
export class CreateItemPage {
  item = true;

  title: any;
  description: any;
  price: any;
  slots: any;
  reviews: string[] = [];
  coverPic: any;
  location: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController,
              private imagePicker: ImagePicker,
              private fileChooser: FileChooser
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateItemPage');
  }

  addImage() {

  }

  createItem() {
    let loading = this.loadingController.create({content: "Creating Item..."});
    let map = new TSMap();
    map.set('coverPic', this.coverPic);
    map.set('title', this.title);
    map.set('location', this.location);
    map.set('price', this.price);
    map.set('description', this.description);
    map.set('slots', this.slots);
    map.set('reviews', this.reviews);

    this.storage.get('irent-token').then(token => {
      loading.present();
      let url = Host.host + "/api/houses?token=" + token;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post<HttpResponse>(url, map.toJSON(), httpOptions).pipe().toPromise().then(result => {
        loading.dismissAll();
        let alert = this.alertCtrl.create({
          title: result['status'],
          subTitle: result['message'],
          buttons: ['Ok']
        });
        // add loading
        alert.present();
      }).then(_ => this.nav.setRoot(SellPage));
    })
  }

  file: any;

  selectFile(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    let loading = this.loadingController.create({content: "Please wait..."});
    loading.present();
    this.getToken().then(token => {
      let url = Host.host + "/api/images?token=" + token;
      let formData = new FormData();
      formData.append('file', this.file);
      this.http.post(url, formData).pipe().toPromise().then(response => {
        console.log(response['message']);
        console.log(response);
        loading.dismissAll();
        this.coverPic = Host.host + "/api/images" + response['message'];
        console.log(this.coverPic);
        let alert = this.alertCtrl.create({
          title: response['status'],
          subTitle: response['message'],
          buttons: ['Ok']
        });
        // add loading
        alert.present();
      });
    });
  }

  private getToken() {
    return this.storage.get("irent-token");
  }

  filepicker() {
    this.fileChooser.open().then(uri =>{
      this.file = uri;
      console.log(this.file);
      let loading = this.loadingController.create({content: "Please wait..."});
      loading.present();
      this.getToken().then(token => {
        let url = Host.host + "/api/images?token=" + token;
        let formData = new FormData();
        formData.append('file', this.file);
        this.http.post(url, formData).pipe().toPromise().then(response => {
          console.log(response['message']);
          console.log(response);
          loading.dismissAll();
          this.coverPic = Host.host + "/api/images" + response['message'];
          console.log(this.coverPic);
          let alert = this.alertCtrl.create({
            title: response['status'],
            subTitle: response['message'],
            buttons: ['Ok']
          });
          // add loading
          alert.present();
        });
      });
    }
  );
  }
}
