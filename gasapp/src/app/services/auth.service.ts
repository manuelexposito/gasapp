import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, NgZone } from '@angular/core';

import firebase from 'firebase/compat/app';
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
            email : r.user?.email});

            localStorage.setItem('name', r.user?.displayName? r.user?.displayName: ' ');
            localStorage.setItem('email', r.user?.email? r.user?.email: ' ');
            this.router.navigate(['/gasolineras'])
          })

  }

  logout(){

    this.auth.signOut();

  }

  getUserName(){

    return localStorage.getItem('name')
  }
}
