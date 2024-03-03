import { GraphQLString } from "graphql";
import { UserType } from "../Types/User.ts";

 export const CREATE_USER = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(args: any) {
    return args
  }
 }