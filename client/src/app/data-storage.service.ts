import { Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { SIGNIN, SIGNUP } from "./graphql/graphql.mutations"


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private apollo: Apollo) { }

  getAuthJWT(username: string, password: string) {
    return this.apollo.mutate({
      mutation: SIGNIN,
      variables: {
        username, password
      }
    })
  }

  signUpUser(
    businessName: string,
    businessAddress: string,
    businessCity: string,
    businessState: string,
    businessPhone: string,
    businessEmail: string,
    registrationDate: string,
    username: string,
    password: string
    ) {
    return this.apollo.mutate({
      mutation: SIGNUP,
      variables: {
        businessName,
        businessAddress,
        businessCity,
        businessState,
        businessPhone,
        businessEmail,
        registrationDate,
        username,
        password
      }
    })
  }
}
