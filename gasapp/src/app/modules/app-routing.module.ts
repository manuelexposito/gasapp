import { GasolinerasFavoritasComponent } from './../components/gasolineras-favoritas/gasolineras-favoritas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../components/shared/sign-in/sign-in.component';
import { GasolineraListComponent } from '../pages/gasolinera-list/gasolinera-list.component';

const routes: Routes = [

  {path:'',  pathMatch:'full', component:SignInComponent},
  {path:'gasolineras', component:GasolineraListComponent},
  {path: 'gasolinerasFav', component:GasolinerasFavoritasComponent}
  //{path:'', pathMatch:'full', redirectTo:'/sign-in'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
