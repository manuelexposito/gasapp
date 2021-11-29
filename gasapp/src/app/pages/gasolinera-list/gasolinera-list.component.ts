import { Observable } from 'rxjs';
import { Provincia } from './../../interfaces/gasolinera';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  Gasolinera,
  GasolineraListResponse,
} from 'src/app/interfaces/gasolinera';
import { GasolineraService } from 'src/app/services/gasolinera.service';

import {map, startWith} from 'rxjs/operators';
import { LabelType, Options } from '@angular-slider/ngx-slider';

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

  provinciaForm = new FormControl();
  provincias: Provincia[] = [];

  allGasolineras: Gasolinera[] = [];

  gasolineraListReducida: Gasolinera[] = [];

  filteredList: Gasolinera[] = [];

  //Autocompletado
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  disableForm = new FormControl(true);

  constructor(private gasolineraService: GasolineraService) {}

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  contadorProvinciasSelected(provincia : string) : number{

    let array : string [] = [];
    if(provincia != ''){

      array.push(provincia)
      return array.length;

    } else return array.length;

  }

  ngOnInit(): void {
    this.getProvincias();
    this.getGasolineraList();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );


  }



  getProvincias(){

    this.gasolineraService.getProvincias().subscribe(

      r => {
          this.provincias = r
      }
    )

  }

  getMunicipios(idProvincia : string){

  }

  getGasolineraList(){

    this.gasolineraService.getGasolineras().subscribe((r) => {

      let jsonToString = JSON.stringify(r);
      this.allGasolineras =
        this.gasolineraService.parseStringToJson(jsonToString).listaEESSPrecio;
    });
  }


}
