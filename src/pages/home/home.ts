import { Component } from '@angular/core';

import { NavController, LoadingController, AlertController, ToastController, ActionSheetController, PopoverController } from 'ionic-angular';
import { Vibration } from 'ionic-native';

//import * as ng2Translate from 'ng2-translate/ng2-translate';

import { BeerService } from '../../providers/beer.service';
import { DetailPage } from '../detail/detail';
import { PopoverPage } from '../PopoverPage/popover-page';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {

  public beers: any[];

  constructor(
    private navCtrl: NavController,
    public beerService: BeerService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public popoverCtrl: PopoverController,
    //public translate: ng2Translate.TranslateService
  ) {

  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Fetching beer...'
    });
    loader.present().then(() => {
      this.beerService.getBeerList().subscribe(
        data => {
          console.log(data);
          this.beers = data;
          loader.dismiss();
        },
        err => {
          console.error(err);
        }
      )
    });
  }

  openDetail(beer: Object) {
    this.navCtrl.push(DetailPage, { data: beer });
    Vibration.vibrate(1000);
  }

  search() {
    let alert = this.alertCtrl.create({
      title: 'Search',
      message: 'Search beers!',
      inputs: [
        {
          name: 'searchTerm',
          placeholder: 'stout'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {
            let loader = this.loadingCtrl.create({
              content: 'Fetching beer...'
            });
            loader.present().then(() => {
              this.beerService.searchBeers(data.searchTerm).subscribe(
                data => {
                  console.log(data);
                  this.beers = data;
                  loader.dismiss();
                },
                err => {
                  let toast = this.toastCtrl.create({
                    message: 'No beers found...',
                    duration: 2000
                  });
                  loader.dismiss().then(() => {
                    toast.present();
                  });
                }
              );
            });
          }
        }
      ]
    });
    alert.present();
  }

  options() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Favorite',
          icon: 'star',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  more(myEvent: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
