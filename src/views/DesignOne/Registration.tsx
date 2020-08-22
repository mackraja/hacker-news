import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
}));

const Registration = ({ ...rest }) => {
  const classes = useStyles();

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Registration"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            margin="normal"
            label="First name"
            name="firstName"
            required            
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"                
            required            
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"            
            name="password"
            type="password"            
            variant="outlined"
          />          
        </CardContent>
        <Divider />
        <Box p={2}>
          <Grid
            container
            justify="space-between"
            spacing={2}
          >
            <Grid
              className={classes.statsItem}
              item
            >
              <Button
                color="default"
                variant="contained"
              >
                Cancel
              </Button>
            </Grid>
            <Grid
              className={classes.statsItem}
              item
            >
              <Button
                color="primary"
                variant="contained"
              >
                Submit
              </Button>
            </Grid>
          </Grid>          
        </Box>
      </Card>
    </form>
  );
};

export default Registration;
