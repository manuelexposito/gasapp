import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GasolineraListResponse } from '../interfaces/gasolinera';

@Injectable({
  providedIn: 'root'
})
export class GasolineraService {

  constructor(private http : HttpClient) {}

  getGasolineras() : Observable<any>{
    return this.http.get<any>("./assets/sedeaplicaciones.minetur.gob.es.json");
  }

}
