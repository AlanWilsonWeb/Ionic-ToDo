import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { Data } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public dataService: Data) {

    this.dataService.getData().then((todos) => {

      if(todos){
        this.items = todos;
      }

    });

  }

  ionViewDidLoad(){

  }

  addItem(){

    let addModal = this.modalCtrl.create(AddItemPage);

    addModal.onDidDismiss((item) => {

          if(item){
            this.saveItem(item);
          }

    });

    addModal.present();

  }

  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }

  killEmAll(){
    this.dataService.killswitch();
    this.navCtrl.push(HomePage);
  }

  trashItem(selected){
    this.items.splice(this.items.indexOf(selected), 1);
    this.dataService.save(this.items);
    this.navCtrl.push(HomePage);
  }

  itemstatus(){
    console.log(this.items);
  }
}
