import {Component} from '@angular/core';
import {Storage} from "@ionic/storage";
import {AlertController, LoadingController, NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TSMap} from "typescript-map";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {SellPage} from "../sell/sell";
import {ImagePicker} from "@ionic-native/image-picker/ngx";
import {FileChooser} from "@ionic-native/file-chooser";

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
  amenns: string[];

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController,
              private fileChooser: FileChooser
  ) {
    this.amenities = [];
    this.http.get<HttpResponse>(Host.host + "/api/amenities").pipe().toPromise().then(response => {
      console.log(response);
      this.amenns = response.message;
    });
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
      let formData = new FormData();
      formData.append('file', this.file);
      let url = Host.host + "/api/images?token=" + token;
      this.http.post(url, formData).pipe().toPromise().then(response => {
        console.log(response['message']);
        console.log(response);
        loading.dismissAll();
        this.coverPic = Host.host + "/api/images" + response['message'];
        console.log(this.coverPic);
        let alert = this.alertCtrl.create({
          title: response['status'],
          subTitle: 'Image was uploaded',
          buttons: ['Ok']
        });
        // add loading
        alert.present();
      });
    });
  }

  androidFile() {
    this.fileChooser.open()
      .then(uri => {
        console.log("uri");
        console.log(uri);

        (<any>window).FilePath.resolveNativePath(uri, (result) => {
          console.log("resolve1");
          let type = result.split(".")[1];
          console.log(result);
          console.log(type);
          (<any>window).resolveLocalFileSystemURL(result, (res) => {
            console.log("resolve2");
            res.file((resFile) => {
              console.log("resolve3");
              console.log(resFile);
              var reader = new FileReader();
              console.log("resolve4");
              reader.readAsArrayBuffer(resFile);
              console.log("resolve 5");
              reader.onloadend = (evt: any) => {
                console.log("what");
                var imgBlob = new Blob([evt.target.result], {type: 'image/jpeg'});
                let formData = new FormData();
                formData.append('file', imgBlob);
                this.getToken().then(token => {
                  console.log("in token " + token);
                  let url = Host.host + "/api/images/v2?token=" + token + "&type=" + type;
                  this.http.post(url, formData).pipe().toPromise().then(response => {
                    console.log("response");
                    console.log(response['message']);
                    console.log(response);
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

                })

                //do what you want to do with the file
              }
            })
          })
        });


        // let url = Host.host + "/api/images/print?file=" + uri;
        // this.http.get(url).pipe().toPromise().then(_ => {
        // });
      });
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
    // if (this.street == null) {
    //   this.cannotBeBlank("Street");
    //   return false;
    // }
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
  amenn: any;
  addAmenity() {
    if (this.amenn == null) {
      let alert = this.alertCtrl.create({
        title: "Please select an amenity from the list",
        buttons: ['Ok']
      });
      // add loading
      alert.present();
      return;
    }
    console.log(this.amenn);
    this.amenities.push(this.amenn);
    console.log(this.amenities);
    this.amenity = "";

  }

  deleteAmenity(amenity) {
    let index = this.amenities.indexOf(amenity);
    this.amenities.splice(index, 1);
  }
}
