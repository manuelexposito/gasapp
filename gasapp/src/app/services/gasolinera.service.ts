import { Municipio } from './../interfaces/gasolinera';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GasolineraListResponse, Provincia } from '../interfaces/gasolinera';

@Injectable({
  providedIn: 'root'
})
export class GasolineraService {

  constructor(private http : HttpClient) {}

  getGasolineras() : Observable<any>{
    return this.http.get<any>("./assets/sedeaplicaciones.minetur.gob.es.json");
  }


  getProvincias() : Observable<Provincia[]>{

    return this.http.get<Provincia[]>(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/Provincias/`)

  }

  getMunicipios(idProvincia : string) : Observable<Municipio[]>{

    return this.http.get<Municipio[]>(`https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/Listados/MunicipiosPorProvincia/${idProvincia}`)
  }



parseStringToJson(string : String){

  let jsonStringReplaced = string.replace(/Precio Gasoleo A/gi, 'precioGasoleoA')
                                .replace(/ListaEESSPrecio/gi, 'listaEESSPrecio')
                                .replace(/Dirección/gi, 'direccion')
                                .replace(/Rótulo/gi, 'rotulo')
                                .replace(/Precio Gasoleo B/gi, 'precioGasoleoB' )
                                .replace(/Tipo venta/gi, 'tipoVenta' )
                                .replace(/Precio Gasolina 95 E10/gi, 'precioGasolina95E10')
                                .replace(/Precio Gasolina 95 E5/gi, 'precioGasolina95E5')
                                .replace(/Precio Gasolina 98 E10/gi, 'precioGasolina98E10')
                                .replace(/Precio Gasolina 98 E5/gi, 'precioGasolina98E5')
                                .replace(/IDMunicipio/gi, 'idMunicipio')
                                .replace(/IDProvincia/gi, 'idProvincia')
                                .replace(/Municipio/gi, 'municipio')
                                .replace(/Provincia/gi, 'provincia')
                                .replace(/C\.P\./gi, 'cP')



return JSON.parse(jsonStringReplaced);


}

}
