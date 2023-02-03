import { gql } from "apollo-angular"

const SIGNIN = gql`
  mutation signInArg($username: String!, $password: String!) {
    signin(input: { _username: $username, _password: $password }) {
      jwtToken
    }
  }
`

export { SIGNIN }
