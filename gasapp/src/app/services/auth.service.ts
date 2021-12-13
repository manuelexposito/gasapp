import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, NgZone } from '@angular/core';

import firebase from 'firebase/compat/app';
import { Gasolinera } from '../interfaces/gasolinera';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;


  constructor(public auth: AngularFireAuth,
    private firestore : AngularFirestore,
    private router : Router) {
  }


  login(){

    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( r => {
      this.firestore.collection('usuarios').doc(r?.user?.uid)
      .set({ name : r.user?.displayName,
            email : r.user?.email,
            photoURL : r.user?.photoURL});

            localStorage.setItem('name', r.user?.displayName? r.user?.displayName: ' ');
            localStorage.setItem('email', r.user?.email? r.user?.email: ' ');
            localStorage.setItem('photoUrl', r.user?.photoURL? r.user?.photoURL: ' ');
            localStorage.setItem('uid', r.user?.uid? r.user?.uid: ' ' )
            this.router.navigate(['/gasolineras'])
          })

  }

  logout(){

    this.auth.signOut().then(

      () => {
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        localStorage.removeItem('photoUrl')
        localStorage.removeItem('uid')

      }
    );

  }

  getUserName(){

    return localStorage.getItem('name')
  }

  getUserImage(){

    return localStorage.getItem('photoUrl')

  }


  addFav(gas : Gasolinera){
    let userId = localStorage.getItem('uid');
    //las promesas se tratan con "then" y tienen que devolverse con RETURN
   return this.firestore.collection(`usuarios/${userId}/favorites`).doc(gas.ideess).set({

      id: gas.ideess,
      rotulo : gas.rotulo,
      direccion : gas.direccion,
      uid : localStorage.getItem('uid')

    })

  }

  removeFav(docId : string){

    let userId = localStorage.getItem('uid');
    this.firestore.collection(`usuarios/${userId}/favorites`).doc(docId).delete();


  }


getFavorites(){
  let userId = localStorage.getItem('uid');
  return this.firestore.collection(`usuarios/${userId}/favorites`).valueChanges();
}

}
