import gql from 'graphql-tag'

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        role
      }
    }
  }
`

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    me {
      id
      name
      email
      role
      permissions
    }
  }
`
