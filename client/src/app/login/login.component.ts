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
    this.dataService.getAuthJWTUsingPostMethod(form.value.username, form.value.password).subscribe((res: any) => {
      const token = res.data.signin.jwtToken
      localStorage.setItem("jwt", token)
    }
    )
  }

  ngOnInit(): void {
    this.credForm = this.fB.group({
      "username": ["", [Validators.required]],
      "password": ["", [Validators.required]]
    })
  }
}
