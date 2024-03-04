import { gql } from '@apollo/client';

export const CREATE_ACCOUNT = gql`
  mutation {
    createAccount(
      $username: String!
      $password: String!  
    ) {
      createAccount(
        username: $username 
        password: $password
      ) { 
        id
        username
        password
      }
    }
  } 
`