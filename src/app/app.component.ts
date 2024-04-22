import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from 'src/environments/environment.prod';
import { ContentService } from './_services/content.service';
const FIREBASE_CONFIG = environment.firebaseConfig;

const app = initializeApp(FIREBASE_CONFIG);

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  public db: any = getFirestore(app);

  constructor(private service: ContentService) {
    this.getDataUser();
  }

  public async getDataUser() {
    let resp = await this.service.getFireData('user');
    this.service.updateUserData(resp);
  }

}
