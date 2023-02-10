import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt'
import { DataStorageService } from '../data-storage.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private jwtHelper: JwtHelperService, private router: Router, private dataService: DataStorageService, private fB: FormBuilder) { }

  invoiceData: any
  itemForm: any
  recCompanyData: any
  recClientData: any
  recItemData: any
  recTempData: any
  tempId: any
  items: any = []

  selectedCompany(event: any) {
    this.recCompanyData.forEach((element: any) => {
      if (element.businessName == event.target.value) {
        this.invoiceData.patchValue({
          "businessId": element.businessId,
          "businessName": element.businessName,
          "businessAddress": element.businessAddress,
          "businessCity": element.businessCity,
          "businessState": element.businessState,
          "businessPhone": element.businessPhone
        })
      }
    })
  }

  selectedClient(event: any) {
    this.recClientData.forEach((element: any) => {
      if (element.clientName == event.target.value) {
        this.invoiceData.patchValue({
          "clientId": element.clientId,
          "clientName": element.clientName,
          "clientAddress": element.clientAddress,
          "clientCity": element.clientCity,
          "clientState": element.clientState,
          "clientPhone": element.clientPhone
        })
      }
    })
  }

  selectedItem(event: any) {
    this.recItemData.forEach((element: any) => {
      if (element.itemName == event.target.value) {
        this.itemForm.patchValue({
          "itemId": element.itemId,
          "itemName": element.itemName,
          "itemPrice": element.itemPrice
        })
      }
    })
  }

  selectedTax(event: any) {
    this.itemForm.patchValue({
      "itemTax": event.target.value
    })
  }

  selectedQuantity(event: any) {
    this.itemForm.patchValue({
      "itemQty": event.target.value
    })
  }

  resetItemForm() {
    this.itemForm.reset()
    let dropDownItem: any = document.getElementById("selectItemDrop")
    let dropDownTax: any = document.getElementById("selectTaxDrop")
    let dropDownQuantity: any = document.getElementById("selectQuantityDrop")
    dropDownItem.selectedIndex = 0
    dropDownTax.selectedIndex = 0
    dropDownQuantity.selectedIndex = 0
  }

  resetDueDate() {
    let invoiceDueDateInput: any = document.getElementById("invoiceDueDateInput")
    invoiceDueDateInput.min = this.invoiceData.value.invoiceDate
  }

  onPost(recPostData: any) {
    console.log(recPostData)

    let data = {
      "businessId": recPostData.value.businessId,
      "clientId": recPostData.value.clientId,
      "invoiceDate": recPostData.value.invoiceDate,
      "invoiceDueDate": recPostData.value.invoiceDueDate,
      "invoiceTaxAmount": recPostData.value.invoiceTaxAmount,
      "invoiceAmountWoTax": recPostData.value.invoiceAmountWoTax,
      "invoiceAmountFinal": recPostData.value.invoiceAmountFinal,
    }
    console.log(data)

    this.dataService.createInvoice(data).subscribe((res: any) => {
      let invoiceId = res.data.createInvoice.invoice.invoiceId
      console.log(invoiceId)
      this.items.forEach((element: any) => {
        let data = {
          "invoiceId": invoiceId,
          "businessId": recPostData.value.businessId,
          "itemId": element.itemId,
          "itemQty": element.itemQty,
          "itemTax": element.itemTax,
          "itemTaxAmount": element.itemTaxAmount,
          "itemAmountWoTax": element.itemAmountWoTax,
          "itemAmountFinal": element.itemAmountFinal,
        }
        this.dataService.createInvoiceItemInfo(data).subscribe((res: any) => {
          console.log(res)
        })
      })
      // console.log("done")
      window.location.reload()
    })
  }

  addToItemList(itemForm: any) {
    this.itemForm.value.itemAmountWoTax = (parseFloat(this.itemForm.value.itemPrice) * parseFloat(this.itemForm.value.itemQty)).toString()
    this.itemForm.value.itemTaxAmount = ((parseFloat(this.itemForm.value.itemTax) * parseFloat(this.itemForm.value.itemAmountWoTax) / 100)).toString()
    this.itemForm.value.itemAmountFinal = (parseFloat(this.itemForm.value.itemAmountWoTax) + parseFloat(this.itemForm.value.itemTaxAmount)).toString()
    this.items.push(itemForm.value)
    let invoiceTaxAmount = 0
    let invoiceAmountWoTax = 0
    let invoiceAmountFinal = 0

    this.items.forEach((element: any) => {
      if (element.itemName != "") {
        invoiceTaxAmount = invoiceTaxAmount + parseFloat(element.itemTaxAmount)
        invoiceAmountWoTax = invoiceAmountWoTax + parseFloat(element.itemAmountWoTax)
        invoiceAmountFinal = invoiceAmountFinal + parseFloat(element.itemAmountFinal)
      }
    })
    this.invoiceData.patchValue({
      "invoiceTaxAmount": (invoiceTaxAmount).toString(),
      "invoiceAmountWoTax": (invoiceAmountWoTax).toString(),
      "invoiceAmountFinal": (invoiceAmountFinal).toString()
    })
    this.itemForm.reset()
  }

  ngOnInit(): void {
    this.dataService.getInvoiceDataMaking().subscribe((res: any) => {
      this.recCompanyData = [res.data.businesses.nodes[0]]
      this.recClientData = res.data.businesses.nodes[0].clients.nodes
      this.recItemData = res.data.businesses.nodes[0].items.nodes
    })

    this.invoiceData = this.fB.group({
      "businessName": ["", [Validators.required]],
      "businessAddress": [, [Validators.required]],
      "businessCity": ["", [Validators.required]],
      "businessState": ["", [Validators.required]],
      "businessPhone": ["", [Validators.required]],

      "clientName": ["", [Validators.required]],
      "clientAddress": ["", [Validators.required]],
      "clientCity": ["", [Validators.required]],
      "clientState": ["", [Validators.required]],
      "clientPhone": ["", [Validators.required]],

      "businessId": ["", [Validators.required]],
      "clientId": ["", [Validators.required]],
      "invoiceDate": ["", [Validators.required]],
      "invoiceDueDate": ["", [Validators.required]],

      "invoiceTaxAmount": [0, [Validators.required]],
      "invoiceAmountWoTax": [0, [Validators.required]],
      "invoiceAmountFinal": [0, [Validators.required]]
    })

    this.itemForm = this.fB.group({
      "itemId": [""],
      "itemName": ["", [Validators.required]],
      "itemPrice": ["", [Validators.required]],
      "itemQty": [0, [Validators.required]],
      "itemTax": [0, [Validators.required]],
      "itemTaxAmount": [""],
      "itemAmountWoTax": [""],
      "itemAmountFinal": [""]
    })
  }
}
