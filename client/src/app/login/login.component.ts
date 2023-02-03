import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fB: FormBuilder, private router: Router) { }
  invalidLogin!: boolean
  credForm: any

  login(form: FormGroup) {
    // console.log(form.value.username)
  }

  ngOnInit(): void {
    this.credForm = this.fB.group({
      "username": ["", [Validators.required]],
      "password": ["", [Validators.required]]
    })
  }
}
