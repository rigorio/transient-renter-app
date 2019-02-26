import {Review} from "./Review";

export class Transient {
  id: any;
  coverPic: any;
  title: any;
  propertyType: any;
  amenities: string[];
  street: any;
  city: any;
  state: any;
  country: any;
  price: any;
  description: any;
  slots: any;
  average: number;
  reviews: Review[] = [];

  constructor(id: any, coverPic: any, title: any, propertyType: any, amenities: string[],
              street: any, city: any, state: any, country: any, price: any,
              description: any, slots: any, average: number, reviews: Review[]) {
    this.id = id;
    this.coverPic = coverPic;
    this.title = title;
    this.propertyType = propertyType;
    this.amenities = amenities;
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.price = price;
    this.description = description;
    this.slots = slots;
    this.average = average;
    this.reviews = reviews;
  }
}
