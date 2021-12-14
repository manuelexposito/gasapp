import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, NgZone } from '@angular/core';

import firebase from 'firebase/compat/app';
import { Gasolinera } from '../interfaces/gasolinera';
import { Lista, ListaData } from '../interfaces/lista.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const USER_ID = localStorage.getItem('uid');

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
   
    //las promesas se tratan con "then" y tienen que devolverse con RETURN
   return this.firestore.collection(`usuarios/${USER_ID}/favorites`).doc(gas.ideess).set({

      id: gas.ideess,
      rotulo : gas.rotulo,
      direccion : gas.direccion,
      uid : localStorage.getItem('uid')

    })

  }

  removeFav(docId : string){

   
    this.firestore.collection(`usuarios/${USER_ID}/favorites`).doc(docId).delete();


  }


  addToNewList(nombreCollection : string, gas : Gasolinera){
  
    return this.firestore.collection(`usuarios/${USER_ID}/listas/`)
    .add({
      nombreLista : nombreCollection,
      gasId : gas.ideess,
      rotulo : gas.rotulo,
      direccion : gas.direccion
    })
    
  }

  addToList(idLista : string, gas : Gasolinera){

    return this.firestore.collection(`usuarios/${USER_ID}/listas/`)
    .doc(idLista).set({
      //TODO: Ver como poner de forma predeterminada el título de la lista viendo solo el nombre
      nombreLista : this.firestore.collection(`usuarios/${USER_ID}/listas/`).doc(idLista),
      gasId : gas.ideess,
      rotulo : gas.rotulo,
      direccion : gas.direccion
    })

  }

  /*
  private listas !: AngularFirestoreCollection<Lista>;
  listaIds !: Observable<Lista[]>

  addToList(gas : Gasolinera){

    this.listas = this.firestore.collection<Lista>(`listaIds`)

    return this.listas.snapshotChanges().pipe(
      map((actions: any[]) => actions.map(r => {

        const data = r.payload.doc.data() as Lista;
        const id = r.payload.doc.id;
        return {id, data};

      }))

    )

  }
  */

  getListas() : AngularFirestoreCollection<ListaData>{
   return this.firestore.collection(`usuarios/${USER_ID}/listas/`);
    
  }

  

getFavorites(){
  
  return this.firestore.collection(`usuarios/${USER_ID}/favorites`).valueChanges();
}

}
