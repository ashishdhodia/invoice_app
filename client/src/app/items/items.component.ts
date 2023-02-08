import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { JwtHelperService } from '@auth0/angular-jwt'
import { DataStorageService } from '../data-storage.service'

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  constructor(private jwtHelper: JwtHelperService, private dataService: DataStorageService, private fB: FormBuilder) { }

  myPutForm: any
  recData: any
  modalTitle: any
  modalId: any
  cartData: any
  private currentuser: any


  fieldsForTable = [
    "Item Name",
    "Item Price",
    "Edit"
  ]

  fields = [
    "Item Name",
    "Item Price",
    "Edit"
  ]

  fieldsOrigin = [
    "itemName",
    "itemPrice"
  ]

  fieldsOriginPost = [
    "itemName",
    "itemPrice"
  ]

  formPutData: any = `{
    "itemName":"",
    "itemPrice":""
  }`

  forModal(itemId: any, item: any) {
    this.modalTitle = item.itemName
    this.modalId = itemId
    this.myPutForm.setValue({
      "itemName": item.itemName,
      "itemPrice": item.itemPrice
    })
  }

  clearForm() {
    this.myPutForm.reset()
  }

  onPost(recPostData: any) {
    let data = recPostData.value
    data = { ...data, businessId: this.currentuser }
    this.dataService.createItem(data).subscribe((res: any) => {
      window.location.reload()
    })
  }

  onPut(recDataPut: any) {
    let data = recDataPut.value
    data = { ...data, "itemId": this.modalId }
    this.dataService.updateItem(data).subscribe((res: any) => {
      // window.location.reload()
    })
  }

  ngOnInit(): void {
    this.dataService.getItems().subscribe((res: any) => {
      this.recData = res.data.items.nodes
    })

    const token = localStorage.getItem("token")
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.currentuser = this.jwtHelper.decodeToken(token).business_id
    }

    this.myPutForm = this.fB.group({
      "itemName": ["", [Validators.required]],
      "itemPrice": ["", [Validators.required]]
    })

  }
}
