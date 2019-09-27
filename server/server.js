const express = require('express')
const graphqlHTTP = require('express-graphql')
const serveStatic = require('serve-static');
const cors = require('cors');

// GraphQL Stuff
const schema = require('./schema');
const dataSources = require('./dataSources');

// Serve
app = express();
app.use(cors());

app.use(serveStatic(__dirname + "/../dist")); // Serve static part

app.use(
    '/graphql',
    graphqlHTTP(() => ({
        schema: schema,
        context: dataSources,
        graphiql: true,
    })),
); // Serve GraphQL part

var port = process.env.PORT || 80;
app.listen(port);
console.log('server started ' + port);