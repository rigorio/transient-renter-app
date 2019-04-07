import { Component } from "@angular/core";
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { User } from "../edit-item/User";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Host } from "../host";
import { HttpResponse } from "../HttpResponse";
import { TSMap } from "typescript-map";
import { FileChooser } from "@ionic-native/file-chooser";
import { Camera, CameraOptions } from "@ionic-native/camera";

@Component({
  selector: "page-edit-account",
  templateUrl: "edit-account.html"
})
export class EditAccountPage {
  contact: any;
  user: User;
  profPic: string;

  private options: CameraOptions = {
    quality: 75,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    private storage: Storage,
    private fileChooser: FileChooser,
    private loadingController: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private camera: Camera
  ) {
    this.user = new User(0, "n/a", null, false, "", "", "", "");

    this.storage.get("irent-token").then(token => {
      let url = Host.host + "/users?token=" + token;
      this.http
        .get<HttpResponse>(url)
        .pipe()
        .toPromise()
        .then(response => {
          console.log(response);
          this.user = response.message;
          this.profPic = this.user.profPic;
        });
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditAccountPage");
  }

  addContact(contact: string) {
    if (contact == null || contact.length < 4) {
      let alert = this.alertCtrl.create({
        title: "Must be at least 4 characters",
        buttons: ["Ok"]
      });
      // add loading
      alert.present();
      return;
    }
    console.log(contact);
    this.user.contacts.push(contact);
    console.log(this.user.contacts);
    this.contact = "";
  }

  editContact() {}

  deleteContact(contact) {
    let index = this.user.contacts.indexOf(contact);
    this.user.contacts.splice(index, 1);
  }

  save() {
    if (
      this.hasNumber(this.user.firstName) ||
      this.hasNumber(this.user.lastName)
    ) {
      let alert = this.alertCtrl.create({
        subTitle: "Name should not contain any numbers",
        buttons: ["Ok"]
      });
      // add loading
      alert.present();
      return;
    }

    let loading = this.loadingController.create({ content: "Please wait...." });
    let map = new TSMap();
    map.set("firstName", this.user.firstName);
    map.set("lastName", this.user.lastName);
    map.set("email", this.user.email);
    map.set("profPic", this.profPic);
    map.set("contacts", this.user.contacts);
    map.set("location", this.user.location);
    let message = map.toJSON();
    loading.present();
    this.storage.get("irent-token").then(token => {
      loading.dismissAll();
      let url = Host.host + "/users?token=" + token;
      this.http
        .put<HttpResponse>(url, message, Host.httpOptions)
        .pipe()
        .toPromise()
        .then(response => {
          let alert = this.alertCtrl.create({
            title: response["status"],
            subTitle: "Details were saved",
            buttons: ["Ok"]
          });
          // add loading
          alert.present();
          console.log(response);
          return;
        });
    });
    loading.dismissAll();
  }

  hasNumber(myString) {
    return /\d/.test(myString);
  }

  imageFile() {
    this.options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    this.camera
      .getPicture(this.options)
      .then(data => {
        (<any>window).resolveLocalFileSystemURL(data, res => {
          res.file(resFile => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(resFile);
            reader.onloadend = (evt: any) => {
              const imgBlob = new Blob([evt.target.result], {
                type: "image/jpeg"
              });

              const formData = new FormData();
              formData.append("file", imgBlob);
              this.uploadFileHttp(formData);
            };
          });
        });
      })
      .catch(err => {
        this.toastCtrl.create({
          message: "Unable to capture image, Please try again",
          duration: 3000,
          position: "top"
        });
      });
  }

  private uploadFileHttp(fd: FormData) {
    this.getToken().then(token => {
      console.log("in token " + token);
      let url = Host.host + "/api/images/v2?token=" + token + "&type=jpeg";
      this.http
        .post(url, fd)
        .pipe()
        .toPromise()
        .then(response => {
          console.log("response");
          console.log(response["message"]);
          console.log(response);
          this.profPic = Host.host + "/api/images" + response["message"];
          console.log(this.profPic);
          this.alertCtrl
            .create({
              title: response["status"],
              subTitle: "Successfully uploaded!",
              buttons: ["Ok"]
            })
            .present();
        });
    });
  }

  androidFile() {
    this.fileChooser
      .open()
      .then(uri => {
        (<any>window).FilePath.resolveNativePath(uri, result => {
          let type = result.split(".")[1];
          (<any>window).resolveLocalFileSystemURL(result, res => {
            res.file(resFile => {
              var reader = new FileReader();
              console.log("resolve4");
              reader.readAsArrayBuffer(resFile);
              console.log("resolve 5");
              reader.onloadend = (evt: any) => {
                console.log("what");
                var imgBlob = new Blob([evt.target.result], {
                  type: "image/jpeg"
                });
                let formData = new FormData();
                formData.append("file", imgBlob);
                this.getToken().then(token => {
                  console.log("in token " + token);
                  let url =
                    Host.host +
                    "/api/images/v2?token=" +
                    token +
                    "&type=" +
                    type;
                  this.http
                    .post(url, formData)
                    .pipe()
                    .toPromise()
                    .then(response => {
                      console.log("response");
                      console.log(response["message"]);
                      console.log(response);
                      this.profPic =
                        Host.host + "/api/images" + response["message"];
                      console.log(this.profPic);
                      let alert = this.alertCtrl.create({
                        title: response["status"],
                        subTitle: "Successfully uploaded!",
                        buttons: ["Ok"]
                      });
                      // add loading
                      alert.present();
                    });
                });

                //do what you want to do with the file
              };
            });
          });
        });

        // let url = Host.host + "/api/images/print?file=" + uri;
        // this.http.get(url).pipe().toPromise().then(_ => {
        // });
      })
      .catch(err => {
        this.toastCtrl.create({
          message: err.message,
          duration: 3000,
          position: "top"
        });
      });
  }

  file: any;

  selectFile(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    let loading = this.loadingController.create({ content: "Please wait..." });
    loading.present();
    this.getToken().then(token => {
      let url = Host.host + "/api/images?token=" + token;
      let formData = new FormData();
      formData.append("file", this.file);
      this.http
        .post(url, formData)
        .pipe()
        .toPromise()
        .then(response => {
          console.log(response["message"]);
          console.log(response);
          loading.dismissAll();
          this.profPic = Host.host + "/api/images" + response["message"];
          console.log(this.profPic);
          let alert = this.alertCtrl.create({
            title: response["status"],
            subTitle: response["message"],
            buttons: ["Ok"]
          });
          // add loading
          alert.present();
        });
    });
  }

  private getToken() {
    return this.storage.get("irent-token");
  }
}
