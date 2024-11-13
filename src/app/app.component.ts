import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { AlertController } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { environment } from 'src/environments/environment.prod';
import { ContentService } from './_services/content.service';
const FIREBASE_CONFIG = environment.firebaseConfig;
const app = initializeApp(FIREBASE_CONFIG);
// const DB = getFirestore(app);
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import OneSignal from 'onesignal-cordova-plugin';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

// 300dpi senha 30300mudar@
export class AppComponent {
  public current_city: any;
  public player_id: any = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : null;

  public db: any = getFirestore(app);
  public browser: any;
  isSupported = false;


  constructor(private service: ContentService,
    private iab: InAppBrowser,
    private alertController: AlertController,
    private platform: Platform) {
    this.initializeApplication();

  }

  ngOnInit() {
    this.setStatusBarColor();

    setTimeout(() => {
      this.OneSignalInit('a5a50f5c-7ca0-407d-bf49-2fea7741aa0e');
    }, 5000);

    // this.initiBrowser();
  }

  async setStatusBarColor() {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#19bcc0' });
  }

  initializeApplication() {
  }

  public OneSignalInit(app_id: string) {
    OneSignal.setAppId(app_id);
    OneSignal.setNotificationOpenedHandler((jsonData: any) => {
      console.log(jsonData)
      if (jsonData?.notification?.additionalData?.url_data) {
        this.createNewView(jsonData?.notification?.additionalData?.url_data);
      }
    });
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log(accepted)

      if (accepted) {
        setInterval(() => {
          OneSignal.getDeviceState((response) => {
            console.log(response)
            localStorage.setItem("user_id", response?.userId);
          });
        }, 2500);
      }
    });
  }

  getUserId() {
    return new Promise<any>((resolve, reject) => {
      OneSignal.getDeviceState((response) => {
        resolve(response.userId);
      })
    });
  }

  public initiBrowser() {
    const browser = this.iab.create('https://www.aquivoceavalia.com.br', '_blank', {
      location: 'no',
      hidden: 'no',
      toolbar: 'no',
      fullscreen: 'no',
      zoom: 'no'
    });
    browser.on('loadstop').subscribe(res => {
      this.player_id = localStorage.getItem("user_id");
      this.getCityName(res?.url);
      this.getParamTrue(res?.url);
    });
  }

  // https://www.aquivoceavalia.com.br/paraiso/paroquia-sao-jose-operario/

  public createNewView(url: any) {
    const browser = this.iab.create(url, '_blank', {
      location: 'no',
      hidden: 'no',
      toolbar: 'no',
      fullscreen: 'no',
      zoom: 'no'
    });
    browser.on('loadstop').subscribe(res => {
      console.log(res);
      if (res?.url == 'https://www.aquivoceavalia.com.br/' || res?.url == 'https://www.aquivoceavalia.com.br') {
        browser.close();
      }
      this.player_id = localStorage.getItem("user_id");
      this.getCityName(res?.url);
      this.getParamTrue(res?.url);
    });
  }

  public getCityName(url: any) {
    let city_name = url.substring(34, url.length - 1);
    if (city_name.length > 3) {
      let id_temp = city_name.indexOf('/');
      let final = city_name.substring(0, id_temp);
      this.current_city = final;
    }
  }

  public getParamTrue(url: any) {
    let param_exist = url.indexOf('review_sent=true');
    console.log(param_exist, 'param_exist')
    console.log(this.player_id, 'player_id')
    if (param_exist !== -1 && this.player_id) {
      console.log(this.player_id)
      this.saveFb(this.current_city, this.player_id)
    }
  }

  public async saveFb(city_name: any, player_id: any) {
    const docRef = doc(this.db, "db_app", city_name);
    const docSnap = await getDoc(docRef);
    let array_temp: any = [];
    array_temp = docSnap.data();
    if (array_temp?.players_ids.indexOf(player_id) === -1) {
      array_temp.players_ids.push(player_id);
      const test = await setDoc(docRef, array_temp);
    }
  }

}
