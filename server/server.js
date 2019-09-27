const express = require('express')
const graphqlHTTP = require('express-graphql')
const serveStatic = require('serve-static');
const dataSources = require('./dataSources');

// GraphQL Stuff
const schema = require('./schema');

// Serve
app = express();
app.use(serveStatic(__dirname + "/../dist")); // Serve static part
app.use(
    '/graphql',
    graphqlHTTP(() => ({
        schema: schema,
        context: dataSources,
        graphiql: true,
    })),
); // Serve GraphQL part

var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);