import React, { useEffect } from 'react';
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
import { useForm } from "react-hook-form";

const useStyles = makeStyles(() => ({
  root: {},
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
}));

type Inputs = {
  name: string,
  profile: string,
  webinarTitle: string
};

const ZoomForm = (props) => {
  const classes = useStyles();
  const { zoomformdata } = props;
  const { register, handleSubmit, watch, errors } = useForm<Inputs>();
 
  return (
    <form
      onSubmit={handleSubmit(zoomformdata)}
      autoComplete="off"
      noValidate
      className={clsx(classes.root)}
    >
      <Card>
        <CardHeader
          subheader="Information is required to start Zoom Meeting"
          title="Zoom Form"
        />
        <Divider />
        <CardContent>
        <TextField
            fullWidth
            margin="normal"
            label="Meeting"
            name="meeting"
            required            
            variant="outlined"
            inputRef={register}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            required            
            variant="outlined"
            inputRef={register}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Role"
            name="role"                
            required            
            variant="outlined"
            inputRef={register}
          />   
        </CardContent>
        <Divider />
        <Box p={1}>
          <Grid
            className={classes.statsItem}
            item
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Grid>        
        </Box>
      </Card>
    </form>
  );
};

export default ZoomForm;
