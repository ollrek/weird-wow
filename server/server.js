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
	.connect(process.env.MONGODB_URI || 'mongodb+srv://dbUser:mnCfW5ZCrfXADJof@cluster0.2k23f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
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