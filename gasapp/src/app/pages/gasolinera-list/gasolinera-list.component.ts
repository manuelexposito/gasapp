import { Observable } from 'rxjs';
import { Municipio, Provincia } from './../../interfaces/gasolinera';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Gasolinera,
  GasolineraListResponse,
} from 'src/app/interfaces/gasolinera';
import { GasolineraService } from 'src/app/services/gasolinera.service';

import { map, startWith } from 'rxjs/operators';
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

  carburanteForm = new FormControl('');
  carburanteSelected !: string;
  //SLIDER PRECIO
  minValue: number = 0.001;
  maxValue: number = 5;
  sliderOptions: Options = {
    floor: 0,
    ceil: 3,
    step: 0.1,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `<b>Mínimo:</b> ${value}€`;
        case LabelType.High:
          return `<b>Máximo:</b> ${value}€`;
        default:
          return `${value}€`;
      }
    },
  };

  carburanteBoolean: boolean = false;
  carburante: Carburante[] = [
    { value: 'precioGasoleoA', viewValue: 'Gasoleo A' },
    { value: 'precioGasoleoB', viewValue: 'Gasoleo B' },
    { value: 'precioGasolina95E10', viewValue: 'Gasolina 95 E10' },
    { value: 'precioGasolina95E5', viewValue: 'Gasolina 95 E5' },
    { value: 'precioGasolina98E10', viewValue: 'Gasolina 98 E10' },
    { value: 'precioGasolina98E5', viewValue: 'Gasolina 98 E5' },
  ];

  provinciaForm = new FormControl('');
  provincias: Provincia[] = [];

  allGasolineras: Gasolinera[] = [];

  filteredList: Gasolinera[] = [];

  //Autocompletado
  myControl = new FormControl();
  municipios: Municipio[] = [];
  filteredOptions!: Observable<string[]>;
  disableForm = new FormControl({ disabled: true });

  constructor(private gasolineraService: GasolineraService) { }

  /*
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.municipiosNombres.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }*/

  ngOnInit(): void {
    this.getProvincias();
    this.getGasolineraList();
    this.filterByProvincias();


  }

  // allGasolineras --> lista predeterminada
  // filteredList --> lista con filtros
  // listaActual --> lista actual con los filtros aplicados

  filterByPrecio() {
  
    //TODO: Averiguar por qué no funciona este filtrado que compara entre dos valores.
    if (this.carburanteForm.value == 'precioGasoleoA') {

      let nuevaLista = this.filteredList.filter(gasolinera => {

        let precioGasA = Number.parseFloat(gasolinera.precioGasoleoA.replace(',', '.'));
       // console.log(precioGasA)
        return  precioGasA >= this.minValue && precioGasA <= this.maxValue
        
      }

      );
      console.log(`${this.minValue} : ${this.maxValue}`)

      this.filteredList = nuevaLista
      console.log(this.filteredList)
      return this.filteredList;
    }

    
    return this.filteredList
  }



  filterByProvincias() {

    this.filteredList = this.allGasolineras;

    if (this.provinciaForm.value.length == 1) {
      this.disableForm.setValue(false);
    } else {
      this.disableForm.setValue(true);
    }

    if (this.provinciaForm.value.length >= 1) {
      let nuevaLista = this.allGasolineras.filter((gasolinera) =>
        this.provinciaForm.value.includes(gasolinera.provincia)
      );
      this.filteredList = nuevaLista;
    } else {
      this.filteredList = this.allGasolineras;
    }



    return this.filteredList;
  }

  getProvincias() {
    this.gasolineraService.getProvincias().subscribe((r) => {
      this.provincias = r;
    });
  }

  getMunicipios(idProvincia: string) {
    this.gasolineraService.getMunicipios(idProvincia).subscribe((r) => {
      this.municipios = r
      console.log(this.municipios)
    });

    /*
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );*/
    return this.municipios;

  }

  getGasolineraList() {
    this.gasolineraService.getGasolineras().subscribe((r) => {
      let jsonToString = JSON.stringify(r);
      this.allGasolineras =
        this.gasolineraService.parseStringToJson(jsonToString).listaEESSPrecio;
      this.filteredList = this.allGasolineras;
    });
  }
}
