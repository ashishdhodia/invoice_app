import { Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { SIGNIN, SIGNUP } from "./graphql/graphql.mutations"


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
}
