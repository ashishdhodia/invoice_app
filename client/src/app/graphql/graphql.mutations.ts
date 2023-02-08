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

const getClients = gql`
query {
  clients {
    nodes {
      id
      businessId
      clientId
      clientName
      clientAddress
      clientCity
      clientState
      clientPhone
    }
  }
}
`

const createClient = gql`
mutation createClientArg(
  $businessId: String!
  $clientName: String!
  $clientAddress: String!
  $clientCity: String!
  $clientState: String!
  $clientPhone: String!
) {
  createClient(
    input: {
      client: {
        businessId: $businessId
        clientName: $clientName
        clientAddress: $clientAddress
        clientCity: $clientCity
        clientState: $clientState
        clientPhone: $clientPhone
      }
    }
  ) {
    client {
      id
      clientState
      clientPhone
      clientName
      clientId
      clientCity
      clientAddress
      businessId
    }
  }
}
`

const updateClient = gql`
mutation updateClientArg(
  $clientId: String!
  $clientName: String!
  $clientAddress: String!
  $clientCity: String!
  $clientState: String!
  $clientPhone: String!
) {
  updateClientByClientId(
    input: {
      patch: {
        clientName: $clientName
        clientAddress: $clientAddress
        clientCity: $clientCity
        clientState: $clientState
        clientPhone: $clientPhone
      }
      clientId: $clientId
    }
  ) {
    client {
      id
      businessId
      clientId
      clientName
      clientAddress
      clientCity
      clientState
      clientPhone
    }
  }
}
`

const getItems = gql`
query {
  items {
    nodes {
      id
      businessId
      itemId
      itemName
      itemPrice
    }
  }
}
`

const createItem = gql`
mutation createItemArg(
  $businessId: String!
  $itemName: String!
  $itemPrice: String!
) {
  createItem(
    input: {
      item: {
        businessId: $businessId
        itemName: $itemName
        itemPrice: $itemPrice
      }
    }
  ) {
    item {
      id
      itemId
      itemName
      itemPrice
      businessId
    }
  }
}
`

const updateItem = gql`
mutation updateClientArg(
  $itemId: String!
  $itemName: String!
  $itemPrice: String!
) {
  updateItemByItemId(
    input: {
      patch: { 
        itemName: $itemName 
        itemPrice: $itemPrice 
      }
      itemId: $itemId
    }
  ) {
    item {
      id
      itemId
      itemName
      itemPrice
      businessId
    }
  }
}
`

export { SIGNIN, SIGNUP, getClients, createClient, updateClient, getItems, createItem, updateItem }