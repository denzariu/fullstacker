import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';

// import gql from 'graphql-tag';
// import { buildASTSchema } from 'graphql';

import { schema } from './schema/index.ts'
import { Accounts } from './entities/Accounts.ts';
import { DataSource } from 'typeorm';


export const dataSource = new DataSource({
  type: "mysql",
  database: "lantmagazine",
  username: "root",
  password: "",
  logging: true,
  synchronize: false,
  
  entities: [Accounts],

  // connectTimeout: 60000,
});
dataSource.initialize()



const app = express();


app.use(express.json())
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  // rootValue: root,
  graphiql: true,
}))

const port = process.env.PORT || 4000
app.listen(port);

console.log(`Running a GraphQL API server at localhost:${port}/graphql`);



