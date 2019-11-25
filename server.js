var express = require('express');
var fs = require('fs');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// const rawEntries = fs.readFileSync('./entries.json');
// const entries = JSON.parse(rawEntries);
// entries.sort((a, b) => new Date(b.date) - new Date(a.date));

const rawEntries = fs.readFileSync('./entries.json');
const entries = JSON.parse(rawEntries);

var schema = buildSchema(`
  type Query {
    getEntries(entryCount: Int, sortBy: String): String
  }
`);

var root = { 
  getEntries: function({entryCount, sortBy}) {
 //  	const rawEntries = fs.readFileSync('./entries.json');
	// const entries = JSON.parse(rawEntries);
	console.log('entryCount', entryCount, sortBy)
	switch(sortBy) {
		case('date'): 
			let sortedByDate = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
	  		return JSON.stringify(sortedByDate.slice(entryCount, entryCount + 5));
	  		break;
	  	case('popularity'):
	  		console.log(entries.length)
	  		let filteredByTrending = entries.filter(function(entry) {return (entry.isTrending == true)})
	  		console.log('entries', entries.length)
	  		let sortedByPopularity = filteredByTrending.sort((a, b) => b.popularity - a.popularity);
	  		console.log('entires', entries.length)
	  		return JSON.stringify(sortedByPopularity.slice(entryCount, entryCount + 5));
	  		break;
	  	case('open'):
	  		let filteredByOpenTasks = entries.filter(function(entry) {return (entry.status == 1)})
	  		for (let task of filteredByOpenTasks) {console.log(task.status)}
			return JSON.stringify(filteredByOpenTasks.slice(entryCount, entryCount + 5));
			break;
		case('closed'):
	  		let filteredByClosedTasks = entries.filter(function(entry) {return (entry.status == 0)})
			return JSON.stringify(filteredByClosedTasks.slice(entryCount, entryCount + 5));
			break;
	}
  	// if (sortBy == 'date') {
  	// 	let sortedByDate = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  	// 	return JSON.stringify(sortedByDate.slice(entryCount, entryCount + 5));
  	// } else if (sortBy == 'popularity') {
  	// 	console.log(entries.length)
  	// 	let filteredByTrending = entries.filter(function(entry) {return (entry.isTrending == true)})
  	// 	console.log('entries', entries.length)
  	// 	let sortedByPopularity = filteredByTrending.sort((a, b) => b.popularity - a.popularity);
  	// 	console.log('entires', entries.length)
  	// 	return JSON.stringify(entries.slice(entryCount, entryCount + 5));
  	// }
  } 
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
