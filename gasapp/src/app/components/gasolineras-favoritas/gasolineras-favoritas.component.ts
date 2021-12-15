import { AuthService } from './../../services/auth.service';
import { FavoriteGas } from './../../interfaces/user';
import { GasolineraService } from 'src/app/services/gasolinera.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Gasolinera } from './../../interfaces/gasolinera';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gasolineras-favoritas',
  templateUrl: './gasolineras-favoritas.component.html',
  styleUrls: ['./gasolineras-favoritas.component.css']
})
export class GasolinerasFavoritasComponent implements OnInit {

  gasFavList !: FavoriteGas[]
  listaGasolineras !: Gasolinera[]
  constructor(private firestore : AngularFirestore, private gasService : GasolineraService, private authService : AuthService) { }

  ngOnInit(): void {



   this.getGasolinerasFavoritas().subscribe(
     r => {
      this.gasFavList = r
      this.gasService.getGasolineras().subscribe(

        r =>{
          let jsonToString = JSON.stringify(r);
          this.listaGasolineras =
            this.gasService.parseStringToJson(jsonToString).listaEESSPrecio

          this.listaGasolineras = this.listaGasolineras.filter( gasolinera => this.gasFavList.some( fav => gasolinera.ideess == fav.id))

        }

      )
     }
   )

  }



  getGasolinerasFavoritas(){

    return this.authService.getFavorites()

  }


/*
  getGasolinerasFavoritas(){

    let idsGasolineras : string [] = [];

    this.firestore.collection<FavoriteGas>('/favGasolineras').valueChanges().subscribe(

      r => {r.forEach( x => idsGasolineras.push(x.id))

        this.gasService.getGasolineras().subscribe(

          r =>{
            let jsonToString = JSON.stringify(r);
            this.listaGasolineras =
              this.gasService.parseStringToJson(jsonToString).listaEESSPrecio

            this.listaGasolineras = this.listaGasolineras.filter( gasolinera => idsGasolineras.includes(gasolinera.ideess) )
            console.log(idsGasolineras)
          }

        )

      }

    )
*/



  }
