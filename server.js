var express = require('express');
var fs = require('fs');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const rawEntries = fs.readFileSync('./entries.json');
const entries = JSON.parse(rawEntries);
entries.sort((a, b) => new Date(b.date) - new Date(a.date));

var schema = buildSchema(`
  type Query {
    getEntries(entryCount: Int, sortBy: String): String
  }
`);

var root = { 
  getEntries: function({entryCount, sortBy}) {
  	
  	if (sortBy == 'date') {
  		return JSON.stringify(entries.slice(entryCount, entryCount + 5));
  	} else if (sortBy == 'popularity') {
  		entries.sort((a, b) => b.popularity - a.popularity);
  		return JSON.stringify(entries.slice(entryCount, entryCount + 5));
  	}
  } 
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
