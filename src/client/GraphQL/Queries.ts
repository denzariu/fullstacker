import { QueryResult, gql, useQuery } from "@apollo/client";

export const GET_ALL_ACCOUNTS =  gql`
  query {
    getAllAccounts {
      id,
      username,
      password,
      email
    }
  }
`

export const ACCOUNT_EXISTS = gql`
  query 
    accountExists(
      $email: String!, 
      $password: String!
    ) {
      accountExists(email: $email, password: $password)
    }
`

export const MAIL_EXISTS = gql`
  query 
    mailExists(
      $email: String!, 
    ) {
      mailExists(email: $email)
    }
`