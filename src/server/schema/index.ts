import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from './Queries/Account.ts' 
import { CREATE_ACCOUNT } from "./Mutations/Account.ts";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllAccounts: GET_ALL_USERS
  }
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAccount: CREATE_ACCOUNT,
  }
})

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation 
})
