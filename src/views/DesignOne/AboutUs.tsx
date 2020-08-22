import React from 'react';
import {
  Typography,
  Link,
  Card,
  CardContent,  
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},  
}));

const AboutUs = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          About Us
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Safeguarding the environment has become a core concern in the 
          development of large cities. 
          <Link href="#">
          view More ...
          </Link>   
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AboutUs;
