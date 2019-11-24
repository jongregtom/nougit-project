import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});



function Entry(props) {
	const classes = useStyles();
	return (
		<div>
			<Card className={classes.card}>
				<Typography variant="h5" component="h2">
          			Hi
        		</Typography>
			</Card>
		</div>
	)

	return <li>{JSON.stringify(props.entry)}</li>
}

export default Entry;