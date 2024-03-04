import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_ACCOUNTS } from './Queries/Account.ts' 
import { CREATE_ACCOUNT, DELETE_ACCOUNT, UPDATE_PASSWORD } from "./Mutations/Account.ts";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllAccounts: GET_ALL_ACCOUNTS
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAccount: CREATE_ACCOUNT,
    deleteAccount: DELETE_ACCOUNT,
    updateAccountPassword: UPDATE_PASSWORD
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation 
})
