import { Component, OnInit } from '@angular/core';
import { Gasolinera, GasolineraListResponse } from 'src/app/interfaces/gasolinera';
import { GasolineraService } from 'src/app/services/gasolinera.service';

@Component({
  selector: 'app-gasolinera-list',
  templateUrl: './gasolinera-list.component.html',
  styleUrls: ['./gasolinera-list.component.css']
})
export class GasolineraListComponent implements OnInit {

  constructor(private gasolineraService : GasolineraService) { }

  allGasolineras : Gasolinera[] = [];
  ngOnInit(): void {

    this.gasolineraService.getGasolineras().subscribe(

      r => {
        // this.allGasolineras = r.listaEESSPrecio;
      
        //TODO : TERMINAR DE REEMPLAZAR LAS VARIABLES QUE NECESITEMOS Y MEJORAR DISEÑO
        let jsonString = JSON.stringify(r);
        let jsonStringReplaced = jsonString.replace(/Precio Gasoleo A/gi, 'precioGasoleoA')
                                            .replace(/ListaEESSPrecio/gi, 'listaEESSPrecio')
                                            .replace(/Dirección/gi, 'direccion')
                                            .replace(/Rótulo/gi, 'rotulo')
       
        let jsonFinal: GasolineraListResponse = JSON.parse(jsonStringReplaced);
       
          this.allGasolineras = jsonFinal.listaEESSPrecio;
         
   

        //console.log(this.allGasolineras);

      }
    )

  }

}
