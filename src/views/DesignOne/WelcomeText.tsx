import React from 'react';
import {
  Typography,
  Card,
  CardContent,  
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},  
}));

const WelcomeText = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Welcome Jack
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          We are always looking forward to meeting new talents! You are willing 
          to become part of the adventure and support us in the development of 
          our activity? Don't hesistate anymore and join us!
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WelcomeText;
