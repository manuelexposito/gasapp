import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, NgZone } from '@angular/core';

import firebase from 'firebase/compat/app';
import { FavoriteGas } from '../interfaces/user';
import { list } from 'firebase/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;


  constructor(public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {
  }


  login() {

    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(r => {
      this.firestore.collection('usuarios').doc(r?.user?.uid)
        .set({
          name: r.user?.displayName,
          email: r.user?.email,
          photoURL: r.user?.photoURL
        });

      localStorage.setItem('name', r.user?.displayName ? r.user?.displayName : ' ');
      localStorage.setItem('email', r.user?.email ? r.user?.email : ' ');
      localStorage.setItem('photoUrl', r.user?.photoURL ? r.user?.photoURL : ' ');
      localStorage.setItem('uid', r.user?.uid ? r.user?.uid : ' ')
      this.router.navigate(['/gasolineras'])
    })

  }

  logout() {

    this.auth.signOut().then(

      () => {
        localStorage.removeItem('name')
        this.router.navigate(['/'])
      }
    );

  }

  getUserName() {

    return localStorage.getItem('name')
  }

  getUserImage() {

    return localStorage.getItem('photoUrl')

  }

  getUserId() {

    return localStorage.getItem('uid')
  }


  getGasolinerasFavoritas() : string[] {

    let loggedUserId = this.getUserId()

    let listaFiltrada !: FavoriteGas[];
    let idesGasolineras !: string[];
    this.firestore.collection<FavoriteGas>('/favGasolineras').valueChanges().subscribe(

      listaFavoritos => {
        listaFiltrada = listaFavoritos.filter(gasolineraFavorita => gasolineraFavorita.userId == loggedUserId)
        listaFiltrada.forEach( x => idesGasolineras = x.idGasolineras)
      }

    )

    return idesGasolineras;
  }


}
