import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGasolineraDetailComponentComponent } from 'src/app/dialogs/dialog-gasolinera-detail-component/dialog-gasolinera-detail-component.component';
import { Gasolinera } from 'src/app/interfaces/gasolinera';
import { GasolineraService } from 'src/app/services/gasolinera.service';


@Component({
  selector: 'app-gasolinera-item',
  templateUrl: './gasolinera-item.component.html',
  styleUrls: ['./gasolinera-item.component.css']
})
export class GasolineraItemComponent implements OnInit {

@Input() gasolineraInput !: Gasolinera;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DialogGasolineraDetailComponentComponent, {
      data: this.gasolineraInput
    });
  }

}
