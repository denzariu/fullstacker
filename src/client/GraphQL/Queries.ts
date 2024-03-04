import { gql } from "@apollo/client";

export const GET_ALL_ACCOUNTS =  gql`
  query {
    getAllAccounts {
      id,
      username,
      password
    }
  }
`