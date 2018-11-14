require('dotenv').config();
const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');

const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');

// Construct a schema, using GraphQL schema language
const typeDefs = fs.readFileSync(path.join(__dirname, 'types.graphql'), 'utf8');
const resolvers =  require('./resolvers');

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: makeExecutableSchema({typeDefs, resolvers}),
  graphiql: true
}));

const PORT = 4000;
console.log(`Server listening on http://localhost:${PORT}/graphql ...`);
app.listen(PORT);
