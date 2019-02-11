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
  file: any;
  propertyType: any;
  street: any;
  city: any;
  state: any;
  country: any;
  amenity: any;
  amenities: string[];

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController,
              private imagePicker: ImagePicker,
              private fileChooser: FileChooser
  ) {
    this.amenities = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateItemPage');
  }

  addImage() {

  }

  createItem() {
    let loading = this.loadingController.create({content: "Creating Item..."});

    if (this.checkNull() == false)
      return;


    this.storage.get('irent-token').then(token => {
      loading.present();
      let url = Host.host + "/api/houses?token=" + token;
      this.fetchCreate(url).pipe().toPromise().then(result => {
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

  fetchCreate(url) {
    let body = this.getBody();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<HttpResponse>(url, body, httpOptions);
  }


  cannotBeBlank(name) {
    let alert = this.alertCtrl.create({
      title: name + " cannot be blank",
      buttons: ['Ok']
    });
    // add loading
    alert.present();
  }

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

  filepicker() {
    this.fileChooser.open().then(uri => {
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

  private getToken() {
    return this.storage.get("irent-token");
  }

  private checkNull() {
    if (this.title == null) {
      this.cannotBeBlank("Title");
      return false;
    }
    if (this.propertyType == null) {
      this.cannotBeBlank("Property Type");
      return false;
    }
    if (this.street == null) {
      this.cannotBeBlank("Street");
      return false;
    }
    if (this.city == null) {
      this.cannotBeBlank("City");
      return false;
    }
    if (this.state == null) {
      this.cannotBeBlank("State");
      return false;
    }
    if (this.country == null) {
      this.cannotBeBlank("Country");
      return false;
    }
    if (this.price == null) {
      this.cannotBeBlank("Price");
      return false;
    }
    if (this.description == null) {
      this.cannotBeBlank("Description");
      return false;
    }
    if (this.slots == null) {
      this.cannotBeBlank("Slots");
      return false;
    }
    return true;
  }

  private getBody() {
    let map = new TSMap();
    map.set('coverPic', this.coverPic);
    map.set('title', this.title);
    map.set('propertyType', this.propertyType);
    map.set('street', this.street);
    map.set('city', this.city);
    map.set('state', this.state);
    map.set('country', this.country);
    map.set('price', this.price);
    map.set('description', this.description);
    map.set('slots', this.slots);
    map.set('reviews', this.reviews);
    map.set('amenities', this.amenities);
    let body = map.toJSON();
    return body;
  }

  addAmenity(amenity: string) {
    if (amenity == null || amenity.length < 4) {
      let alert = this.alertCtrl.create({
        title: "Must be at least 4 characters",
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
