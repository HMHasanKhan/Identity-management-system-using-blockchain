import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { AppComponent } from './app.component';
import { Web3Service } from './shared/web3.service';
import { SimpleComponentComponent } from './simple-component/simple-component.component';
import { ZxingScannerComponent } from './zxing-scanner/zxing-scanner.component';
import { QRCodeModule } from 'angular2-qrcode';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { OwlModule } from 'angular-owl-carousel';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {Routes, RouterModule} from '@angular/router';
import { CRYPT_CONFIG_PROVIDER, CryptConfigProvider, EncryptionService } from 'angular-encryption-service';
const appRputes: Routes =[
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent },
  {path: 'signup', component: SignupComponent},
]


@NgModule({
  declarations: [
	AppComponent,
	SimpleComponentComponent,
  ZxingScannerComponent,
  
  AppComponent,
  HeaderComponent,
  BodyComponent,
  HomeComponent,
  LoginComponent,
  SignupComponent,

	
  ],


  imports: [
    BrowserModule,
    FormsModule,
    NgQrScannerModule,
    QRCodeModule,
    HttpModule,
    BrowserModule,
    // OwlModule,
    
    RouterModule.forRoot(appRputes)


  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
