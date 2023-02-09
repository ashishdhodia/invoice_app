import { Component, ElementRef, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { DataStorageService } from '../data-storage.service'
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  @ViewChild('PDF', { static: false }) el!: ElementRef

  constructor(private dataService: DataStorageService, private fB: FormBuilder) { }
  recInvoiceData: any
  recFeesData: any
  recItemListData: any
  recCompanyData: any
  recClientData: any
  currentId: any
  pdfData: any
  items: any = []

  makePDF() {
    // let pdf = new jsPDF('l', 'pt', 'a3')
    let pdf = new jsPDF({
      orientation: 'l',
      unit: 'pt',
      format: 'a3',
      putOnlyUsedFonts: true,
      floatPrecision: 16,
      hotfixes: ["px_scaling"]
    })
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        let invoiceId = this.pdfData.value.invoiceId
        pdf.save(invoiceId + ".pdf")
      }
    })
  }

  changeView(invoiceId: any) {
    this.items = []
    this.pdfData.patchValue({
      "FinalAmountWithoutTax": 0
    })
    this.currentId = invoiceId
    this.recInvoiceData.forEach((element: any) => {
      if (element.invoiceId == invoiceId) {
        console.log(element)

        this.pdfData.patchValue({
          "invoiceId": element.invoiceId,

          "businessName": element.business.businessName,
          "businessAddress": element.business.businessAddress,
          "businessCity": element.business.businessCity,
          "businessState": element.business.businessState,
          "businessPhone": element.business.businessPhone,

          "clientName": element.client.clientName,
          "clientAddress": element.client.clientAddress,
          "clientCity": element.client.clientCity,
          "clientState": element.client.clientState,
          "clientPhone": element.client.clientPhone,

          "businessId": element.business.businessId,
          "clientId": element.client.clientId,

          "invoiceDate": element.invoiceDate,
          "invoiceDueDate": element.invoiceDueDate,

          "invoiceTaxAmount": element.invoiceTaxAmount,
          "invoiceAmountWOTax": element.invoiceAmountWoTax,
          "invoiceAmountFinal": element.invoiceAmountFinal
        })
        this.items.push(element.invoiceItemInfos.nodes)
        this.items = this.items[0]
      }
    })
  }

  ngOnInit(): void {
    this.dataService.getInvoiceDataView().subscribe((res: any) => {
      this.recInvoiceData = res.data.invoices.nodes
    })

    this.pdfData = this.fB.group({
      "invoiceId": ["", [Validators.required]],

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

      "invoiceTaxAmount": ["", [Validators.required]],
      "invoiceAmountWOTax": ["", [Validators.required]],
      "invoiceAmountFinal": ["", [Validators.required]]
    })
  }
}
