import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public auth: AngularFireAuth, private firestore : AngularFirestore, private router : Router) { }

  ngOnInit(): void {
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
/* TODO: Llevar estos métodos a un componente de AUTH
  logout(){
    this.auth.signOut();
  }*/


}
