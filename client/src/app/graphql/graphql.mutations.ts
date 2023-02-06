import { gql } from "apollo-angular"

const SIGNIN = gql`
  mutation signInArg($username: String!, $password: String!) {
    signin(input: { _username: $username, _password: $password }) {
      jwtToken
    }
  }
`

const SIGNUP = gql`
      mutation signUpArg(
      $businessName: String!
      $businessAddress: String!
      $businessCity: String!
      $businessState: String!
      $businessPhone: String!
      $businessEmail: String!
      $registrationDate: Date!
      $username: String!
      $password: String!
    ) {
      signup(
        input: {
          _businessName: $businessName,
          _businessAddress: $businessAddress,
          _businessCity: $businessCity,
          _businessState: $businessState,
          _businessPhone: $businessPhone,
          _businessEmail: $businessEmail,
          _registrationDate: $registrationDate,
          _username: $username,
          _password: $password
        }
      ) {
        jwtToken
      }
    }
`
export { SIGNIN, SIGNUP }
