import React from 'react';
import Entry from './Entry';

function EntriesList(props) {
	console.log('props: ', props.entries)
	// const entries = props.entries.map((entry) => {
	// 	console.log('entry', entry.length)
	// 	return <Entry entry={entry}/>
	// });

	return (
		<div>
			{props.entries.map(entry => (
				<Entry entry={entry}/>
			))}
		</div>
	);
}

export default EntriesList;