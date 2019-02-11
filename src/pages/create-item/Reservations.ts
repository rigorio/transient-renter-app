export class Reservations{
  id: number;
  userId: number;
  houseId: number;
  arrival: string;
  departure: string;
  name: string;
  contacts: string[];
  coverPic: string;
  location: string;
  title: string;
  price: number;
  description: string;
  slots: number;
  reviews: number[];

  constructor(id: number, userId: number, houseId: number, arrival: string, departure: string, name: string, contacts: string[], coverPic: string, location: string, title: string, price: number, description: string, slots: number, reviews: number[]) {
    this.id = id;
    this.userId = userId;
    this.houseId = houseId;
    this.arrival = arrival;
    this.departure = departure;
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
