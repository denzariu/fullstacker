/*
// Test data
const POSTS = [
  { author: "Haruki Murakami", book: 'Padurea norvegiana', body: "Hello DAY!" },
  { author: "Tatiana Tibuleac", book: "Vara in care mama a avut ochii verzi", body: "Hello SUMMER!"}
];



// Query is the main entry point for API consumer 
const schema = buildASTSchema(gql`
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }
  type Post {
    id: ID
    author: String
    book: String
    body: String
  }
`);

/*
  type Mutation {
    createPost(field: String): Post
    deletePost(field: String): String
  }


//@ts-ignore
const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  posts: () => POSTS.map(mapPost),
  post: ({ id }) => mapPost(POSTS[id], id)
};

*/

import { GraphQLBoolean, GraphQLList, GraphQLString } from "graphql";
import { AccountType } from "../Types/Account.js";
import { Accounts } from "../../entities/Accounts.js";

export const GET_ALL_ACCOUNTS = {
  type: new GraphQLList(AccountType),
  resolve() {
    return Accounts.find();
  }
} 

export const ACCOUNT_EXISTS = {
  type: GraphQLBoolean,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  async resolve(parent: any, args: any) {
    console.log(parent)

    const { email, password } = args
    const user = await Accounts.findOneBy({email: email, password: password})

    if (user)
      return true

    return false
  }
} 

export const MAIL_EXISTS = {
  type: GraphQLBoolean,
  args: {
    email: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    console.log(parent)

    const { email } = args
    const user = await Accounts.findOneBy({email: email})

    if (user)
      return true

    return false
  }
} 