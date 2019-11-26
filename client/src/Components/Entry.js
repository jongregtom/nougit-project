import React from 'react';
import Pledge from './Pledge';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ReplyIcon from '@material-ui/icons/Reply';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/red';

const useStyles = makeStyles({
  container: {
  	display: 'flex',
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  card: {
    width: 600,
    marginBottom: 60,
    left: 'auto',
    right: 'auto',
  },
  text: {
    display: 'flex',
    alignItems: 'left'
  },
  pos: {
    marginBottom: 12,
  },
});

function getButtonType(entry) {

	let RedButton = withStyles(theme => ({
		  root: {
		    backgroundColor: red[500],
		  },
		}))(Fab);
	let GreenButton = withStyles(theme => ({
	  root: {
	    backgroundColor: green[500],
	  },
	}))(Fab);

	if (entry.isTrending == true) {
		return (
			<RedButton
	          variant="extended"
	          size="small"
	          color="primary"
	          aria-label="add"
	        >
	          Trending
	        </RedButton>
		)
	} else if (entry.status == 0) {
		return (
			<GreenButton
	          variant="extended"
	          size="small"
	          color="primary"
	          aria-label="add"
	        >
	          Task Complete
	        </GreenButton>
		)
	}
	else if (entry.status == 1) {
		return (
			<GreenButton
	          variant="extended"
	          size="small"
	          color="primary"
	          aria-label="add"
	        >
	          Task Not Complete
	        </GreenButton>
		)
	}
}


function Entry(props) {
	const classes = useStyles();
	const { entry } = props;
	return (
		<div className={classes.container}>
			<Card className={classes.card}>
				<CardHeader
					avatar = {<Avatar alt="Avatar" src={entry.author.picture} />}
					title = {entry.author.name}
					subheader = "Front-end Developer"
					action = { getButtonType(entry) }
				/>
				<CardContent>
					<Typography className={classes.text} gutterBottom color="textSecondary" variant="h5" component="h2">
				        {entry.title}
			        </Typography>
			        <Typography className={classes.text} gutterBottom variant="body2" color="textSecondary" component="p">
			          {entry.description}
			        </Typography>
				</CardContent>
				<Pledge entry={entry}/>
				<CardActions>
					<Button size='small' color='default'>
						<ChatBubbleOutlineIcon />
						Comments({entry.numComments})
					</Button>
					<Button size='small' color='default'>
						<ReplyIcon />
						Share
					</Button>
					<IconButton m='margin-right' color="inherit">
		 				<MoreHorizIcon />
		 			</IconButton>					
				</CardActions>
				{/*<BottomAppBar comments={entry.numComments}/>*/}
			</Card>
		</div>
	)
}

export default Entry;