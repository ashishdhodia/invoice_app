import { Component } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private jwtHelper: JwtHelperService) { }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt")
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true
    }
    else {
      return false
    }
  }

  logOut() {
    localStorage.removeItem("jwt")
  }

}
