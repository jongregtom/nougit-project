import React from 'react';
import Entry from './Entry';

function EntriesList(props) {

	const entries = props.entries.map((entry) => {
		console.log(entry)
		return <Entry entry={entry}/>
	});

	return (
		<ul>
			{entries}
		</ul>
	);
}

export default EntriesList;