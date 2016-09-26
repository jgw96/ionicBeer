import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { BeerService } from '../providers/beer.service';
import { PopoverPage } from '../pages/PopoverPage/popover-page';

//import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailPage,
    PopoverPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    //StoreModule.provideStore({ counter: counterReducer }, { counter: 0 }),
    /*TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailPage,
    PopoverPage
  ],
  providers: [BeerService]
})
export class AppModule { }
