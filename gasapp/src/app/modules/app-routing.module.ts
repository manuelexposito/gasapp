import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from '../components/shared/sign-in/sign-in.component';
import { GasolineraListComponent } from '../pages/gasolinera-list/gasolinera-list.component';

const routes: Routes = [
  
  {path:'',  pathMatch:'full', component:SignInComponent},
  {path:'gasolineras', pathMatch:'full', component:GasolineraListComponent},
  //{path:'', pathMatch:'full', redirectTo:'/sign-in'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
