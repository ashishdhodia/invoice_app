import { Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { SIGNIN } from "./graphql/graphql.mutations"


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private apollo: Apollo) { }

  getAuthJWTUsingPostMethod(username: string, password: string) {
    return this.apollo.mutate({
      mutation: SIGNIN,
      variables: {
        username, password
      }
    })
  }
}
