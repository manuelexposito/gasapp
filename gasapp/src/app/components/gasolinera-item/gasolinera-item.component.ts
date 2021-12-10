import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGasolineraDetailComponentComponent } from 'src/app/dialogs/dialog-gasolinera-detail-component/dialog-gasolinera-detail-component.component';
import { Gasolinera } from 'src/app/interfaces/gasolinera';
import { GasolineraService } from 'src/app/services/gasolinera.service';

import { doc, deleteDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import { trace } from 'console';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteGas } from 'src/app/interfaces/user';
@Component({
  selector: 'app-gasolinera-item',
  templateUrl: './gasolinera-item.component.html',
  styleUrls: ['./gasolinera-item.component.css']
})
export class GasolineraItemComponent implements OnInit {




  @Input() gasolineraInput !: Gasolinera;

  constructor(public dialog: MatDialog,
    public authService: AuthService,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogGasolineraDetailComponentComponent, {
      width: '500px',
      data: this.gasolineraInput
    });
  }
  /*
  addFav() {

    let gas: Gasolinera = this.gasolineraInput

    let idsGasolineras: string[] = [];
    
    this.firestore.collection<FavoriteGas>('/favGasolineras').valueChanges().subscribe(
      r => { r.forEach(x => idsGasolineras.push(x.id))
        if(idsGasolineras.includes(this.gasolineraInput.ideess)){
          this.firestore.collection('favGasolineras')
          .doc(gas.ideess).delete
          return true

        }else{

          this.firestore.collection('favGasolineras')
          .doc(gas.ideess)
          .set({
            userId: this.authService.getUserId(),
            id: gas.ideess
          })
          
         return false;
        }
        
      }
    )

  

  }

*/

  addFav(){


    //TODO : QUE SOLO AÑADA SI LA GASOLINERA NO ERA FAVORITA. QUE ELIMINE DE LO CONTRARIO
    //TODO: No se está añadiendo la lista de gasolineras fav en la colección. CORREGIR ESTO.
  let gas: Gasolinera = this.gasolineraInput
  let loggedUserId = this.authService.getUserId();
  
  if (loggedUserId != null){


    this.firestore.collection('favGasolineras')
    .add({
      userId: loggedUserId,
      idGasolineras: this.authService.getGasolinerasFavoritas()? this.authService.getGasolinerasFavoritas(): []
    })

  }
  }
  
 

}
