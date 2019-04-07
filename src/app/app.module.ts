import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { ListPage } from "../pages/list/list";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginPage } from "../pages/login/login";
import { MenuPage } from "../pages/menu/menu";
import { SellPage } from "../pages/sell/sell";
import { AccountPage } from "../pages/account/account";
import { CreateItemPage } from "../pages/create-item/create-item";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { SelectItemPage } from "../pages/select-item/select-item";
import { EditItemPage } from "../pages/edit-item/edit-item";
import { ReservationsPage } from "../pages/reservations/reservations";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { FileChooser } from "@ionic-native/file-chooser";
import { Camera } from "@ionic-native/camera";
import { RegisterPage } from "../pages/register/register";
import { FilterPage } from "../pages/filter/filter";
import { EditAccountPage } from "../pages/edit-account/edit-account";
import { ReviewsPage } from "../pages/reviews/reviews";
import { ReviewpagePage } from "../pages/reviewpage/reviewpage";
import { StarRatingModule } from "ionic3-star-rating";
import { IonicRatingModule } from "ionic-rating/dist";
import { CheckinPage } from "../pages/checkin/checkin";

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    ListPage,
    LoginPage,
    MenuPage,
    SellPage,
    CreateItemPage,
    SelectItemPage,
    EditItemPage,
    ReservationsPage,
    RegisterPage,
    FilterPage,
    EditAccountPage,
    ReviewsPage,
    ReviewpagePage,
    CheckinPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StarRatingModule,
    IonicRatingModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    ListPage,
    LoginPage,
    MenuPage,
    SellPage,
    CreateItemPage,
    SelectItemPage,
    EditItemPage,
    ReservationsPage,
    RegisterPage,
    FilterPage,
    EditAccountPage,
    ReviewsPage,
    ReviewpagePage,
    CheckinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    FileChooser,
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
