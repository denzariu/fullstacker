import { GraphQLString } from "graphql";
import { AccountType } from "../Types/Account.ts";
import { Accounts } from "../../entities/Accounts.ts";

 export const CREATE_ACCOUNT = {
  type: AccountType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    console.log(args, parent)
    const { username, password } = args;
    await Accounts.insert({username, password});

    return args;
  },
 };