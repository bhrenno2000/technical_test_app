import { Component } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { environment } from 'src/environments/environment.prod';
const FIREBASE_CONFIG = environment.firebaseConfig;
const app = initializeApp(FIREBASE_CONFIG);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public db: any = getFirestore(app);
  public player_id: any = localStorage.getItem("user_id");
  public current_city: any;

  public list_cities: any = [];

  constructor(private iab: InAppBrowser) {
    this.listarDocumentos();


  }

  async listarDocumentos() {
    try {
      const db = getFirestore();
      const collectionRef = collection(db, "db_app");
      const querySnapshot = await getDocs(collectionRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        if (doc.data()['is_active']) {
          this.list_cities.push(doc.data())
        }
      });
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
    }
  }

  public initiBrowser(item: any) {
    console.log(item)
    // setTimeout(() => {
    const browser = this.iab.create(item?.url, '_blank', {
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
    // }, 1);
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
