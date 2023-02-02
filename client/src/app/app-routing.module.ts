import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NavbarComponent } from './navbar/navbar.component'
import { InvoicesComponent } from './invoices/invoices.component'
import { ClientsComponent } from './clients/clients.component'
import { ItemsComponent } from './items/items.component'
import { LoginComponent } from './login/login.component'
import { ProfileComponent } from './profile/profile.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: "navbar", component: NavbarComponent },
  { path: "home", component: HomeComponent },
  { path: "invoices", component: InvoicesComponent },
  { path: "clients", component: ClientsComponent },
  { path: "items", component: ItemsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "login", component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
