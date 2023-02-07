import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { DataStorageService } from '../data-storage.service'
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private dataService: DataStorageService, private fB: FormBuilder, private router: Router, private datePipe: DatePipe) { }

  signUpForm: any
  validSignUp!: boolean

  signUp(form: any) {
    let registrationDate: any = this.datePipe.transform((new Date), 'YYYY-MM-dd')

    let data = {
      businessName: form.businessName,
      businessAddress: form.businessAddress,
      businessCity: form.businessCity,
      businessState: form.businessState,
      businessPhone: form.businessPhone,
      businessEmail: form.businessEmail,
      registrationDate: registrationDate,
      username: form.value.username,
      password: form.value.password
    }

    this.dataService.signUpUser(data).subscribe((res: any) => {
      const token = res.data.signup.jwtToken
      localStorage.setItem("token", token)
      this.router.navigate(["/home"])
    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
    this.signUpForm = this.fB.group({
      "businessName": ["", [Validators.required]],
      "businessAddress": ["", [Validators.required]],
      "businessCity": ["", [Validators.required]],
      "businessState": ["", [Validators.required]],
      "businessPhone": ["", [Validators.required]],
      "businessEmail": ["", [Validators.required, Validators.email]],
      "username": ["", [Validators.required, Validators.pattern("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")
      ]],
      "password": ["", [Validators.required]]
    })
  }

}
