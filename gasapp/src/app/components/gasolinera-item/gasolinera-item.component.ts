import { Component, Input, OnInit } from '@angular/core';
import { Gasolinera } from 'src/app/interfaces/gasolinera';


@Component({
  selector: 'app-gasolinera-item',
  templateUrl: './gasolinera-item.component.html',
  styleUrls: ['./gasolinera-item.component.css']
})
export class GasolineraItemComponent implements OnInit {

@Input() gasolineraInput !: Gasolinera;

  constructor() { }

  ngOnInit(): void {
  }

}
