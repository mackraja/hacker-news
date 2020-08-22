import React from 'react';
import {
  Box,
  Container,
  Grid,  
} from '@material-ui/core';
import Toolbar from './Toolbar';
import WelcomeText from './WelcomeText';
import AboutUs from './AboutUs';
import NewsFeed from './NewsFeed';
import Registration from './Registration';

const DesignOne = () => {

  return (
    <Container maxWidth={false}>
      <Toolbar />
      <Box mt={3}>
        <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Grid
                container
                justify="space-between"
                spacing={2}
              >
                <Grid item ><WelcomeText /></Grid>
              </Grid>
              <Grid
                container
                justify="space-between"
                spacing={2}
              >
                <Grid item ><AboutUs /></Grid>                
              </Grid>                  
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <NewsFeed />
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <Registration />
            </Grid>
        </Grid>
        </Box>
      </Container>
  );
};

export default DesignOne;
