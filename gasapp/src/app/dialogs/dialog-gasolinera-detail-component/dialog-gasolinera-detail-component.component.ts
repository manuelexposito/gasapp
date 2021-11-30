import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Gasolinera } from 'src/app/interfaces/gasolinera';

@Component({
  selector: 'app-dialog-gasolinera-detail-component',
  templateUrl: './dialog-gasolinera-detail-component.component.html',
  styleUrls: ['./dialog-gasolinera-detail-component.component.css']
})
export class DialogGasolineraDetailComponentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Gasolinera) { }


  gasolinera !: Gasolinera;
  ngOnInit(): void {

    this.gasolinera = this.data;
  }

}
