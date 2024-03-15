import { GraphQLBoolean, GraphQLString } from "graphql";



// Before sending the user a cookie with a token, we'll encode user's token.
export const ENCODE_TOKEN = {
  type: GraphQLBoolean,
  args: {
    session_token: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    console.log(parent)

    const { session_token } = args;

    //Split
    const T1 = session_token.slice(0, session_token.length / 2);
    const T2 = session_token.slice(session_token.length / 2 + 1, session_token.length)

    console.log('Slices: ', T1, ' ', T2)
    
  }
}