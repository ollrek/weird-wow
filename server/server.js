const express = require('express')
const graphqlHTTP = require('express-graphql')
const history = require('connect-history-api-fallback');
const serveStatic = require('serve-static');
const cors = require('cors');
const mongoose = require("mongoose");

// GraphQL Stuff
const schema = require('./schema');
const dataSources = require('./dataSources');

// Mongoose stuff
mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://heroku_csq5j5mm:mavl2370j2mafbtlfs5ag14c3e@ds229088.mlab.com:29088/heroku_csq5j5mm')
	.then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
    
// Serve
app = express();
app.use(history({
    // verbose:true,
    rewrites: [
        { from: /\/graphql/, to: '/graphql'}
      ]
}))

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