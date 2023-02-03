import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private fB: FormBuilder, private router: Router) { }

  signUpForm: any
  validSignUp!: boolean

  signUpPost(data: any) {

  }

  ngOnInit(): void {
    this.signUpForm = this.fB.group({
      "_business_name": ["", [Validators.required]],
      "_business_address": ["", [Validators.required]],
      "_business_city": ["", [Validators.required]],
      "_business_state": ["", [Validators.required]],
      "_business_phone": ["", [Validators.required]],
      "_business_email": ["", [Validators.required, Validators.email]],
      "_registration_date": ["YYYY-MM-DD", [Validators.required]],
      "_username": ["", [Validators.required, Validators.minLength(8)]],
      "_password": ["", [Validators.required]]
    })
  }

}
