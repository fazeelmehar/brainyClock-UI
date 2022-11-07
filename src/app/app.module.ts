import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { APP_BASE_HREF } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { GetappComponent } from './getapp/getapp.component';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { ForgotpasswordComponent } from './user/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './user/resetpassword/resetpassword.component';
import { ResetpasswordlinkComponent } from './user/resetpasswordlink/resetpasswordlink.component';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from "../app/auth/auth.guard";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    GetappComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ResetpasswordlinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        disallowedRoutes: []
      }
    })
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
