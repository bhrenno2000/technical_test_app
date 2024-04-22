import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
const FIREBASE_CONFIG = environment.firebaseConfig;
const APP = initializeApp(FIREBASE_CONFIG);
const DB = getFirestore(APP);

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  public userDataSubject: BehaviorSubject<any>;
  public userData: Observable<any>;

  constructor() {
    this.userDataSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user_data') as any));
    this.userData = this.userDataSubject.asObservable();
  }

  public async getFireData(doc_name: string) {
    const docRef = doc(DB, "bd_test", doc_name);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }

  public updateUserData(value: any) {
    this.userDataSubject.next(value);
    localStorage.setItem('user_data', JSON.stringify(value));
  }

}
