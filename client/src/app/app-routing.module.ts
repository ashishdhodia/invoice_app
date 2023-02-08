import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NavbarComponent } from './navbar/navbar.component'
import { InvoicesComponent } from './invoices/invoices.component'
import { ClientsComponent } from './clients/clients.component'
import { ItemsComponent } from './items/items.component'
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component'
import { HomeComponent } from './home/home.component'
import { SignupComponent } from './signup/signup.component'
import { AuthGuard } from './auth.guard'

const routes: Routes = [
  { path: "**", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "invoices", component: InvoicesComponent, canActivate: [AuthGuard] },
  { path: "clients", component: ClientsComponent, canActivate: [AuthGuard] },
  { path: "items", component: ItemsComponent, canActivate: [AuthGuard] },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
