const express = require('express');
// added new const to require the apollo server package
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// created const for typeDefs and Resolvers to set schema and equivalent of the routes currently being used for Apollo
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({app})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// for REST version... commented out as we are using Apollo
// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
  console.log(`🌍 Now listening on localhost:${PORT}`);
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
