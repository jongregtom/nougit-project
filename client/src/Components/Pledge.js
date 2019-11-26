import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  container: {
  },
   card: {
   	display: 'flex',
   	flexDirection: 'column',
    maxWidth: 500,
    maxHeight: 200,
    marginLeft: 'auto',
  	marginRight: 'auto',
  },
  cardActionArea: {
  	display: 'flex',
  	flexDirection: 'row',
  },
  media: {
    height: 150,
    width: 150,
  },
  button: {
  	display: 'flex',
  	flexDirection: 'column',
  }
}));

function Pledge(props) {
	
	const classes = useStyles();
	const { entry } = props;

	return (
		<div className={classes.container}>
		    <Card className={classes.card}>
		      <CardActionArea className={classes.cardActionArea}>

		        <CardMedia
		          className={classes.media}
		          image={entry.thumbnail}
		          title="Contemplative Reptile"
		        />
		        <CardContent>
		          <Typography variant="h5" color='primary' component="h2">
		            ${entry.pledgeTotal}
		          </Typography>
		          <Typography variant="body2" color="textSecondary" component="p">
		            Pledged of ${entry.pledgeGoal} goal
		          </Typography>
		          <Typography variant="h5" color='textSecondary' component="h2">
		            {entry.pledgerCount}
		          </Typography>
		          <Typography variant="body2" color="textSecondary" component="p">
		            pledgers
		          </Typography>
		        </CardContent>
		        <CardContent className={classes.button}>
		          {entry.pledgeTotal >= entry.pledgeGoal &&
		          	<Fab
			          	variant="extended"
			          	size="large"
			          	color='secondary'
			          	aria-label="view submission"
			        >
			          	View Submission
	        		</Fab>
	        	  }
		          {entry.pledgeTotal < entry.pledgeGoal &&
		          	<Fab
			          	variant="extended"
			          	size="medium"
			          	color='primary'
			          	aria-label="view submission"
			        >
			          	Pledge
	        		</Fab>
	        	  }
		          {entry.pledgeTotal >= entry.pledgeGoal &&
		          	<Typography variant="body2" color="textSecondary" component="p">
		            	Reward Claimed
		          	</Typography>
			      }

		        </CardContent>
		      </CardActionArea>
		      <CardActions>
		        <Button size="small" color="primary">
		          View Source
		        </Button>
		        <Button size="small" color="primary">
		          {`</>`}Code Submissions({entry.codeSubmissionTotal})
		        </Button>
		      </CardActions>
    		</Card>
		</div>
	)
	// return (
	// 	<div>
	// 	<AppBar color="default" className={classes.appBar}>
	// 		<Toolbar>
	// 			<IconButton edge="start" color="inherit">
	// 				<ChatBubbleOutlineIcon />
	// 			</IconButton>
	// 			<IconButton edge="end" color="inherit">
	// 				<MoreHorizIcon />
	// 			</IconButton>
	// 		</Toolbar>
	// 	</AppBar>
	// 	</div>
	// )
}

export default Pledge;