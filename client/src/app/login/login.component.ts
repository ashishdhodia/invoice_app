import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DataStorageService } from '../data-storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private dataService: DataStorageService, private fB: FormBuilder, private router: Router) { }
  invalidLogin!: boolean
  credForm: any

  login(form: FormGroup) {
    this.dataService.getAuthJWT(form.value.username, form.value.password).subscribe((res: any) => {
      if (!res.data.signin.jwtToken) {
        this.invalidLogin = true
        return
      }
      const token = res.data.signin.jwtToken
      localStorage.setItem("token", token)
      this.invalidLogin = false
      this.router.navigate(["/home"])
    }, err => {
      this.invalidLogin = true
    })
  }

  ngOnInit(): void {
    this.credForm = this.fB.group({
      "username": ["", [Validators.required]],
      "password": ["", [Validators.required]]
    })
  }
}
