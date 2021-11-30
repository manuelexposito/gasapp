import { Observable } from 'rxjs';
import { Municipio, Provincia } from './../../interfaces/gasolinera';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Gasolinera,
  GasolineraListResponse,
} from 'src/app/interfaces/gasolinera';
import { GasolineraService } from 'src/app/services/gasolinera.service';

import {map, startWith} from 'rxjs/operators';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { GasolineraItemComponent } from 'src/app/components/gasolinera-item/gasolinera-item.component';

interface Carburante {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-gasolinera-list',
  templateUrl: './gasolinera-list.component.html',
  styleUrls: ['./gasolinera-list.component.css'],
})
export class GasolineraListComponent implements OnInit {


  //SLIDER PRECIO
  minValue: number = 100;
  maxValue: number = 400;
  sliderOptions: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  carburante: Carburante[] = [
    {value: 'precioGasoleoA', viewValue: 'Gasoleo A'},
    {value: 'precioGasoleoB', viewValue: 'Gasoleo B'},
    {value: 'precioGasolina95E10', viewValue: 'Gasolina 95 E10'},
    {value: 'precioGasolina95E5', viewValue: 'Gasolina 95 E5'},
    {value: 'precioGasolina98E10', viewValue: 'Gasolina 98 E10'},
    {value: 'precioGasolina98E5', viewValue: 'Gasolina 98 E5'},
  ];

  provinciaForm = new FormControl('');
  provincias: Provincia[] = [];

  //Para comprobar el numero de provincias seleccionadas
  selectedProvincias : Provincia [] = [];
  //--------


  allGasolineras: Gasolinera[] = [];

  gasolineraListReducida: Gasolinera[] = [];

  filteredList: Gasolinera[] = [];

  //Autocompletado
  myControl = new FormControl();
  municipiosNombres !: string[];
  filteredOptions!: Observable<string[]>;
  disableForm = new FormControl({disabled : true});

  constructor(private gasolineraService: GasolineraService) {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.municipiosNombres.filter(option => option.toLowerCase().includes(filterValue));
  }


  ngOnInit(): void {
    
    this.getProvincias();
    this.getGasolineraList();
    this.filterByProvincias()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );


  }


  filterByProvincias(){

    this.filteredList = this.allGasolineras

    if(this.provinciaForm.value.length == 1){
      this.disableForm.setValue(false)
     
    } else{
      this.disableForm.setValue(true)
    } 


    if(this.provinciaForm.value.length >= 1){
      this.filteredList = this.allGasolineras.filter(gasolinera => this.provinciaForm.value.includes(gasolinera.provincia))
    } else{

      this.filteredList = this.allGasolineras
    }


    // this.filteredList = this.allGasolineras.filter(gasolinera => idProvincias.includes(gasolinera.idProvincia))
    console.log(this.provinciaForm.value) 
    
    return this.filteredList
   
      
  }


  getProvincias(){

    this.gasolineraService.getProvincias().subscribe(

      r => {
          this.provincias = r
      }
    )

  }

  getMunicipios(idProvincia : string){
    
      this.gasolineraService.getMunicipios(idProvincia).subscribe(

        r => {r.forEach(

          x => this.municipiosNombres.push(x.Municipio)
          
        )
        console.log(this.municipiosNombres)}
      )
      
  }

  getGasolineraList(){

    this.gasolineraService.getGasolineras().subscribe((r) => {
      
      let jsonToString = JSON.stringify(r);
      this.allGasolineras = this.gasolineraService.parseStringToJson(jsonToString).listaEESSPrecio;
       this.filteredList = this.allGasolineras;
    });
  }


}
