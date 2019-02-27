import {Review} from "./Review";

export class Reservation {
  id: number;
  userId: number;
  houseId: number;
  checkIn: string;
  checkOut: string;
  firstName: string;
  lastName: string;
  contacts: string[];
  coverPic: string;
  location: string;
  title: string;
  price: number;
  description: string;
  slots: number;
  average: number;
  reservationReviews: Review[];
  propertyType: any;
  amenities: string[];
  street: any;
  stars: number[];
  city: any;
  state: any;
  country: any;

  constructor(id: number, userId: number, houseId: number, checkIn: string,
              checkOut: string, contacts: string[], coverPic: string,
              location: string, title: string, price: number, description: string,
              slots: number, average: number, reservationReviews: Review[], stars: number[],
              firstName: string, lastName: string) {
    this.id = id;
    this.userId = userId;
    this.houseId = houseId;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.firstName = firstName;
    this.lastName = lastName;
    this.contacts = contacts;
    this.coverPic = coverPic;
    this.location = location;
    this.title = title;
    this.price = price;
    this.description = description;
    this.slots = slots;
    this.average = average;
    this.stars = stars;
    this.reservationReviews = reservationReviews;
  }
}
