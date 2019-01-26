import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  transients: Array<{
    id: number, pics: string[], title: string, price: number, description: string,
    slots: number, vacant: number, reviews: number[], ownerId: number
  }> = [];
  owner: Array<{ name: string, contacts: string[], transientId: number[] }> = [];

  keyword: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();


  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    console.log(item);
  }

  private init() {
// If we navigated to this page, we will have an item available as a nav param
    this.transients.push({
      id: 1,
      pics: ['f', 'v'],
      title: 'dog',
      price: 500,
      description: 'the quick brown fox jumped over the lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy me',
      slots: 5,
      vacant: 3,
      reviews: [1, 3, 6, 5],
      ownerId: 1
    });

    this.owner.push({
      name: 'heyayayaya',
      contacts: ['a', 'b'],
      transientId: [1]
    });

    this.transients.push({
      id: 1,
      pics: ['f', 'v'],
      title: 'dog',
      price: 500,
      description: 'the quick brown fox jumped over the lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy me',
      slots: 5,
      vacant: 3,
      reviews: [1, 3, 6, 5],
      ownerId: 1
    });

    this.owner.push({
      name: 'heyayayaya',
      contacts: ['a', 'b'],
      transientId: [1]
    });

    this.transients.push({
      id: 1,
      pics: ['f', 'v'],
      title: 'dog',
      price: 500,
      description: 'the quick brown fox jumped over the lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy me',
      slots: 5,
      vacant: 3,
      reviews: [1, 3, 6, 5],
      ownerId: 1
    });

    this.owner.push({
      name: 'heyayayaya',
      contacts: ['a', 'b'],
      transientId: [1]
    });

    this.transients.push({
      id: 1,
      pics: ['f', 'v'],
      title: 'dog',
      price: 500,
      description: 'the quick brown fox jumped over the lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy lazy me',
      slots: 5,
      vacant: 3,
      reviews: [1, 3, 6, 5],
      ownerId: 1
    });

    this.owner.push({
      name: 'heyayayaya',
      contacts: ['a', 'b'],
      transientId: [1]
    });
  }
}
