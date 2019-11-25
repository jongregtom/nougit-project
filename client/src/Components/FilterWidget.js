import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  container: {
  	marginBottom: 80,
  },
  margin: {
    margin: theme.spacing(2),
  },
}));


function FilterWidget(props) {
	const classes = useStyles();

	const [clickedButtonValue, setClickedButtonValue] = useState('All');

	function handleClick(e, buttonTitle) {
		if (buttonTitle == clickedButtonValue) {return}
		setClickedButtonValue(buttonTitle);
		props.setClickedButtonValue(buttonTitle);
	}

	return (
		<div className={classes.container}>
	        <Fab
	        	variant="extended"
	         	size="small"
	          	color={(clickedButtonValue == 'All') ? 'primary' : 'default'}
	          	aria-label="add"
	          	className={classes.margin}
	          	onClick={(e) => handleClick(e, 'All')}
	        >
	          All
	        </Fab>
	        <Fab
	          	variant="extended"
	          	size="small"
	          	color={(clickedButtonValue == 'Trending Tasks') ? 'primary' : 'default'}
	          	aria-label="add"
	          	className={classes.margin}
	          	onClick={(e) => handleClick(e, 'Trending Tasks')}
	        >
	          Trending Tasks
	        </Fab>
	        <Fab 
	        	variant="extended" 
	        	size="small"
	        	color={(clickedButtonValue == 'Open Tasks') ? 'primary' : 'default'}
	        	aria-label="add" 
	        	className={classes.margin}
	        	onClick={(e) => handleClick(e, 'Open Tasks')}
	        >
	          Open Tasks
	        </Fab>
	        <Fab 
	        	variant="extended" 
	        	size="small"
	        	color={(clickedButtonValue == 'Completed Tasks') ? 'primary' : 'default'}
	        	aria-label="add" 
	        	className={classes.margin}
	        	onClick={(e) => handleClick(e, 'Completed Tasks')}
	        >
	          Completed Tasks
	        </Fab>
	    </div>
	)
}

export default FilterWidget;