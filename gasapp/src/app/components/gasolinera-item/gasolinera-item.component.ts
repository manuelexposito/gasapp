import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGasolineraDetailComponentComponent } from 'src/app/dialogs/dialog-gasolinera-detail-component/dialog-gasolinera-detail-component.component';
import { Gasolinera } from 'src/app/interfaces/gasolinera';
import { GasolineraService } from 'src/app/services/gasolinera.service';


import firebase from 'firebase/compat/app';
import { trace } from 'console';
@Component({
  selector: 'app-gasolinera-item',
  templateUrl: './gasolinera-item.component.html',
  styleUrls: ['./gasolinera-item.component.css']
})
export class GasolineraItemComponent implements OnInit {

  //public readonly testDocValue$ !: Observable<any>;


@Input() gasolineraInput !: Gasolinera;

  constructor(public dialog: MatDialog,
    public auth : AngularFireAuth,
    private firestore : AngularFirestore,) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogGasolineraDetailComponentComponent, {
      width: '500px',
      data: this.gasolineraInput
    });
  }

  addFav(){

    let gas : Gasolinera = this.gasolineraInput

    this.firestore.collection('favGasolineras')
      .doc(gas.ideess)
        .set({
          id : gas.ideess,
          fav : true
        })

      }

}
