export class Reservation{
  id: number;
  userId: number;
  houseId: number;
  checkIn: string;
  checkOut: string;
  name: string;
  contacts: string[];
  coverPic: string;
  location: string;
  title: string;
  price: number;
  description: string;
  slots: number;
  reviews: number[];
  propertyType: any;
  amenities: string[];
  street: any;
  city: any;
  state: any;
  country: any;

  constructor(id: number, userId: number, houseId: number, checkIn: string, checkOut: string, name: string, contacts: string[], coverPic: string, location: string, title: string, price: number, description: string, slots: number, reviews: number[]) {
    this.id = id;
    this.userId = userId;
    this.houseId = houseId;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.name = name;
    this.contacts = contacts;
    this.coverPic = coverPic;
    this.location = location;
    this.title = title;
    this.price = price;
    this.description = description;
    this.slots = slots;
    this.reviews = reviews;
  }
}
