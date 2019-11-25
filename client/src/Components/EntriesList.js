import React, { useEffect } from 'react';
import Entry from './Entry';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
  	marginBottom: 50,
  },
});

function EntriesList(props) {
	const classes = useStyles();
	console.log('props: ', props)

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	function handleScroll() {
	  if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
	  console.log('Fetch more list items!');
	  props.fetchMoreEntries(props.count + 5);
	}
	// const entries = props.entries.map((entry) => {
	// 	console.log('entry', entry.length)
	// 	return <Entry entry={entry}/>
	// });

	return (
		<div className={classes.container} onScroll={handleScroll}>
			{props.entries.map((entry, i) => (
				<Entry key={i.toString()} entry={entry}/>
			))}
		</div>
	);
}

export default EntriesList;