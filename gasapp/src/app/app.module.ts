import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportsModule } from './modules/material-imports.module';
import { HttpClientModule } from '@angular/common/http';
import { GasolineraListComponent } from './pages/gasolinera-list/gasolinera-list.component';
import { GasolineraItemComponent } from './components/gasolinera-item/gasolinera-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { DialogGasolineraDetailComponentComponent } from './dialogs/dialog-gasolinera-detail-component/dialog-gasolinera-detail-component.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { SignUpComponent } from './components/shared/sign-up/sign-up.component';
import { SignInComponent } from './components/shared/sign-in/sign-in.component';
import { VerifyEmailComponent } from './components/shared/verify-email/verify-email.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, USE_DEVICE_LANGUAGE, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { GasolinerasFavoritasComponent } from './components/gasolineras-favoritas/gasolineras-favoritas.component';
@NgModule({
  declarations: [
    AppComponent,
    GasolineraListComponent,
    GasolineraItemComponent,
    DialogGasolineraDetailComponentComponent,
    SignUpComponent,
    SignInComponent,
    VerifyEmailComponent,
    ToolbarComponent,
    GasolinerasFavoritasComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    MaterialImportsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
