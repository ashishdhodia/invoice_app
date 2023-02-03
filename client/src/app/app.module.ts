import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { JwtModule } from "@auth0/angular-jwt"
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { GraphQLModule } from './graphql.module'
import { HttpClientModule } from '@angular/common/http'
import { NavbarComponent } from './navbar/navbar.component'
import { InvoicesComponent } from './invoices/invoices.component'
import { ClientsComponent } from './clients/clients.component'
import { ItemsComponent } from './items/items.component'
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component'
import { HomeComponent } from './home/home.component'
import { SignupComponent } from './signup/signup.component'
import { AuthGuard } from './auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InvoicesComponent,
    ClientsComponent,
    ItemsComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule
  ],
  providers: [{
    provide: JWT_OPTIONS,
    useValue: JWT_OPTIONS
  },
    JwtHelperService,
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
