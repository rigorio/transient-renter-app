import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, Nav, NavController, NavParams} from 'ionic-angular';
import {TSMap} from "typescript-map";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";
import {Host} from "../host";
import {HttpResponse} from "../HttpResponse";
import {SellPage} from "../sell/sell";
import {Reservation} from "../create-item/Reservation";
import {Transient} from "../create-item/Transient";
import {FileChooser} from "@ionic-native/file-chooser";

/**
 * Generated class for the EditItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  transient: Transient;
  reservations: Reservation[];
  amenities: string[] = [];
  amenn: any;
  coverPic: any;

  constructor(public nav: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              private storage: Storage,
              private loadingController: LoadingController,
              private alertCtrl: AlertController,
              private fileChooser: FileChooser
  ) {
    this.transient = navParams.get("transient");
    this.coverPic = this.transient.coverPic;
    // this.transient.amenities = [];
    this.reservations = [];
    this.http.get<HttpResponse>(Host.host + "/api/amenities").pipe().toPromise().then(response => {
      console.log(response);
      this.amenities = response.message;
    });
    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/reservations/users/" + this.transient.id + "?token=" + token;
      this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
        console.log(response);
        this.reservations = response['message'];
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditItemPage');
  }

  editItem() {
    let loading = this.loadingController.create({content: "Saving Item..."});
    loading.present();
    let map = new TSMap();
    map.set('id', this.transient.id);
    map.set('coverPic', this.coverPic);
    map.set('title', this.transient.title);
    map.set('propertyType', this.transient.propertyType);
    map.set('street', this.transient.street);
    map.set('city', this.transient.city);
    map.set('state', this.transient.state);
    map.set('country', this.transient.country);
    map.set('price', this.transient.price);
    map.set('description', this.transient.description);
    map.set('slots', this.transient.slots);
    map.set('amenities', this.transient.amenities);
    this.storage.get('irent-token').then(token => {
      let url = Host.host + "/api/houses?token=" + token;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.put<HttpResponse>(url, map.toJSON(), httpOptions).pipe().toPromise().then(result => {
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

  addImage() {

  }

  delete(reservation) {

    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingController.create({content: "Deleting..."});
            loading.present();
            this.storage.get('irent-token').then(token => {
              let url = Host.host + "/api/reservations/" + reservation.id + "?token=" + token;
              this.http.delete(url).pipe().toPromise().then(response => {
                loading.dismissAll();
                let alert = this.alertCtrl.create({
                  title: response['status'],
                  subTitle: response['message'],
                  buttons: ['Ok']
                });
                // add loading
                alert.present();
              }).then(_ => {
                this.storage.get('irent-token').then(token => {
                  let url = Host.host + "/api/reservations/users/" + this.transient.id + "?token=" + token;
                  this.http.get<HttpResponse>(url).pipe().toPromise().then(response => {
                    console.log(response);
                    this.reservations = response['message'];
                  })
                })
              })
            })

            //kore
          }
        }
      ]
    });

    alert.present();

  }

  file: any;
  amenity: string = "";

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
                      subTitle: 'Successfully uploaded!',
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

  deleteItem() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.getToken().then(token => {

              let url = Host.host + "/api/houses/" + this.transient.id + "?token=" + token;
              this.http.delete(url).pipe().toPromise().then(response => {
                let alert = this.alertCtrl.create({
                  title: response['status'],
                  subTitle: response['message'],
                  buttons: ['Ok']
                });
                // add loading
                alert.present();
                this.nav.setRoot(SellPage);
              });

            });
          }
        }
      ]
    });

    alert.present();


  }

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
    if (!(this.transient.amenities.indexOf(this.amenn) > -1))
      this.transient.amenities.push(this.amenn);
    console.log(this.transient.amenities);
    this.amenity = "";

  }

  deleteAmenity(amenity) {
    let index = this.transient.amenities.indexOf(amenity);
    this.transient.amenities.splice(index, 1);
  }
}
