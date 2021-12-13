import { FavoriteGas } from './../../interfaces/user';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGasolineraDetailComponentComponent } from 'src/app/dialogs/dialog-gasolinera-detail-component/dialog-gasolinera-detail-component.component';
import { Gasolinera } from 'src/app/interfaces/gasolinera';
import { GasolineraService } from 'src/app/services/gasolinera.service';

import { query, where } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { trace } from 'console';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-gasolinera-item',
  templateUrl: './gasolinera-item.component.html',
  styleUrls: ['./gasolinera-item.component.css'],
})
export class GasolineraItemComponent implements OnInit {
  @Input() gasolineraInput!: Gasolinera;

  constructor(
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService : AuthService
  ) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogGasolineraDetailComponentComponent, {
      width: '500px',
      data: this.gasolineraInput,
    });
  }


  addFav(){
    //las promesas se tratan con "then" y tienen que devolverse con RETURN
    this.authService.addFav(this.gasolineraInput).then(

      r => {

      }

    )
  }

  removeFav(){

    this.authService.removeFav(this.gasolineraInput.ideess)
  }


  /*
  addFav(){

    let collectionFavGas = this.firestore.collection('favGasolineras')
    let gas : Gasolinera = this.gasolineraInput
    let idsGasolineras : string [] = [];
    this.firestore.collection<FavoriteGas>('/favGasolineras').valueChanges().subscribe(

      r => {r.forEach( x => idsGasolineras.push(x.id))

        if(!idsGasolineras.includes(gas.ideess)){
          collectionFavGas
          .doc()
            .set({
              id : gas.ideess,
              userId : localStorage.getItem('uid'),
              fav : true
            })

          } else if(idsGasolineras.includes(gas.ideess)){

          let index = idsGasolineras.indexOf(gas.ideess)
          delete idsGasolineras[index]
           collectionFavGas.ref.where("id", "==", gas.ideess).get().then(

            (r) => r.forEach( d => d.ref.delete())
           )


          }
        }



    )


    }
 

  addFav() {
    let collectionFavGas = this.firestore.collection('favGasolineras');
    let gas: Gasolinera = this.gasolineraInput;
    let idsGasolineras: string[] = [];
    this.firestore
      .collection<FavoriteGas>('/favGasolineras')
      .valueChanges()
      .subscribe((r) => {
        r.forEach((x) => idsGasolineras.push(x.id));

        collectionFavGas.doc().set({
          id: gas.ideess,
          userId: localStorage.getItem('uid'),
          fav: true,
        });
      });
      return true
  }

  removeFav() {
    let collectionFavGas = this.firestore.collection('favGasolineras');
    let gas: Gasolinera = this.gasolineraInput;
    let idsGasolineras: string[] = [];
    this.firestore
      .collection<FavoriteGas>('/favGasolineras')
      .valueChanges()
      .subscribe((r) => {
        r.forEach((x) => idsGasolineras.push(x.id));

        let index = idsGasolineras.indexOf(gas.ideess);
        delete idsGasolineras[index];
        collectionFavGas.ref
          .where('id', '==', gas.ideess)
          .get()
          .then((r) => r.forEach((d) => d.ref.delete()));
      });
      return false
  }


  checkIfFav(idGas : string) : boolean{

    let collectionFavGas = this.firestore.collection('favGasolineras');
    let idsGasolineras: string[] = [];

    this.firestore
      .collection<FavoriteGas>('/favGasolineras')
      .valueChanges()
      .subscribe((r) => {
        r.forEach((x) => idsGasolineras.push(x.id));
      }
      )

    return idsGasolineras.includes(idGas) ? true : false

  }
     */
}
