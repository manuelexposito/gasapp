import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Gasolinera } from 'src/app/interfaces/gasolinera';
import { Lista } from 'src/app/interfaces/lista.interface';
import { AuthService } from 'src/app/services/auth.service';
import { GasolineraItemComponent } from '../../gasolinera-item/gasolinera-item.component';




@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GasolineraItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Gasolinera, private authService: AuthService) { }

  listas: Lista[] = [];
  listasForm = new FormGroup(
    {
      nombreLista: new FormControl(),
      idLista: new FormControl()
    }
  )

  ngOnInit(): void {

    this.getLists();

  }




  addToList() {

    //TODO: Investigar como hacer todo en el mismo método

    let nombreNuevaLista = this.listasForm.controls['nombreLista'].value as string
    let idNuevaLista = this.listasForm.controls['idLista'].value as string
    

      return this.authService.addToNewList(nombreNuevaLista, this.data)

    /*
    if (idNuevaLista != null) {

      return this.authService.addToList(idNuevaLista, this.data);

    } else {


    }

*/

  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.listasForm.value);
  }

  getLists() {
    return this.authService.getListas().snapshotChanges().pipe(
      map((changes) =>
        changes.map(
          c => ({
            id: c.payload.doc.id, data: c.payload.doc.data()
          })
        )
      )
    ).subscribe(
      d => {
        this.listas = d
      }
    );
  }

}
