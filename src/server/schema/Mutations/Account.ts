import { GraphQLID, GraphQLString } from "graphql";
import { AccountType } from "../Types/Account.ts";
import { Accounts } from "../../entities/Accounts.ts";
import { ResponseType } from "../Types/Response.ts";

 export const CREATE_ACCOUNT = {
  type: AccountType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any): Promise<typeof args> {
    console.log(args, parent)

    const { email, password } = args;
    await Accounts.insert({email, password});

    return args;
  },
 };

 export const DELETE_ACCOUNT = { 
  type: ResponseType,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(parent: any, args: any) {
    console.log(args, parent)

    const id = args.id
    await Accounts.delete(id)
    return {successful: true, message: 'DELETED ACCOUNT SUCCESSFULLY'}
  }
 }

 export const UPDATE_PASSWORD = {
  type: ResponseType,
  args: {
    email: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString }
  },
  async resolve(parent: any, args: any) {
    console.log(args, parent)

    const {email, oldPassword, newPassword} = args
    const user = await Accounts.findOneBy({email: email})

    if (!user) throw new Error("USER_DOES_NOT_EXIST")
    const userPassword = user?.password

    if (oldPassword === userPassword) {
      await Accounts.update({email: email}, {password: newPassword})
      return {successful: true, message: 'PASSWORD UPDATED'}
    } else {
      throw new Error("PASSWORDS_NO_MATCH")
    }
  }
 }