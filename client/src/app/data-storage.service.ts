import { Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { SIGNIN, SIGNUP, getClients, createClient, updateClient, getItems, createItem, updateItem } from "./graphql/graphql.mutations"


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private apollo: Apollo) { }

  getAuthJWT(data: any) {
    return this.apollo.mutate({
      mutation: SIGNIN,
      variables: {
        username: data.username, password: data.password
      }
    })
  }

  signUpUser(data: any) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        businessName: data.businessName,
        businessAddress: data.businessAddress,
        businessCity: data.businessCity,
        businessState: data.businessState,
        businessPhone: data.businessPhone,
        businessEmail: data.businessEmail,
        registrationDate: data.registrationDate,
        username: data.username,
        password: data.password
      }
    })
  }

  getClients() {
    return this.apollo.watchQuery<any>({
      query: getClients
    }).valueChanges
  }

  createClient(data: any) {
    return this.apollo.mutate({
      mutation: createClient,
      variables: {
        businessId: data.businessId,
        clientName: data.clientName,
        clientAddress: data.clientAddress,
        clientCity: data.clientCity,
        clientState: data.clientState,
        clientPhone: data.clientPhone
      }
    })
  }

  updateClient(data: any) {
    return this.apollo.mutate({
      mutation: updateClient,
      variables: {
        clientId: data.clientId,
        clientName: data.clientName,
        clientAddress: data.clientAddress,
        clientCity: data.clientCity,
        clientState: data.clientState,
        clientPhone: data.clientPhone
      }
    })
  }

  getItems() {
    return this.apollo.watchQuery<any>({
      query: getItems
    }).valueChanges
  }

  createItem(data: any) {
    return this.apollo.mutate({
      mutation: createItem,
      variables: {
        businessId: data.businessId,
        itemName: data.itemName,
        itemPrice: data.itemPrice
      }
    })
  }

  updateItem(data: any) {
    return this.apollo.mutate({
      mutation: updateItem,
      variables: {
        itemId: data.itemId,
        itemName: data.itemName,
        itemPrice: data.itemPrice
      }
    })
  }
}
