import { Component } from '@angular/core'
import { DataStorageService } from '../data-storage.service'
import { FormBuilder, Validators } from '@angular/forms'
import { JwtHelperService } from '@auth0/angular-jwt'


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {

  constructor(private jwtHelper: JwtHelperService, private dataService: DataStorageService, private fB: FormBuilder) { }

  myPutForm: any
  recData: any
  modalTitle: any
  modalId: any
  cartData: any
  private currentuser: any


  fieldsForTable = [
    "Client Name",
    "Client Address",
    "Client City",
    "Client State",
    "Client Phone",
    "Edit"
  ]

  fields = [
    "Client Name",
    "Client Address",
    "Client City",
    "Client State",
    "Client Phone",
    "Edit"
  ]

  fieldsOrigin = [
    "clientName",
    "clientAddress",
    "clientCity",
    "clientState",
    "clientPhone"
  ]

  fieldsOriginPost = [
    "clientName",
    "clientAddress",
    "clientCity",
    "clientState",
    "clientPhone"
  ]

  formPutData: any = `{
    "clientName":"",
    "clientAddress":"",
    "clientCity":"",
    "clientState":"",
    "clientPhone":""
  }`

  forModal(clientId: any, item: any) {
    this.modalTitle = item.clientName
    this.modalId = clientId
    this.myPutForm.setValue({
      "clientName": item.clientName,
      "clientAddress": item.clientAddress,
      "clientCity": item.clientCity,
      "clientState": item.clientState,
      "clientPhone": item.clientPhone
    })
  }

  clearForm() {
    this.myPutForm.reset()
  }

  onPost(recPostData: any) {
    let data = recPostData.value
    data = { ...data, businessId: this.currentuser }
    this.dataService.createClient(data).subscribe((res: any) => {
      window.location.reload()
    })
  }

  onPut(recDataPut: any) {
    let data = recDataPut.value
    data = { ...data, "clientId": this.modalId }
    this.dataService.updateClient(data).subscribe((res: any)=> {
      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.dataService.getClients().subscribe((res: any) => {
      this.recData = res.data.clients.nodes
    })

    const token = localStorage.getItem("token")
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.currentuser = this.jwtHelper.decodeToken(token).business_id
    }

    this.myPutForm = this.fB.group({
      "clientName": ["", [Validators.required]],
      "clientAddress": ["", [Validators.required]],
      "clientCity": ["", [Validators.required]],
      "clientState": ["", [Validators.required]],
      "clientPhone": ["", [Validators.required]]
    })

  }

}
