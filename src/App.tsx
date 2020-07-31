import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from "@material-ui/core";
import Routes from './routes';
import { history } from "./redux/store";
import { useActions, hackerAction } from "./actions";
import { RootState } from "./redux/reducers";

import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import { AlertContainer } from "./components";

function App(props?: any) { 

  const hackerActions = useActions(hackerAction);

  useEffect(() => {
      if (props && Object.keys(props.hacker).length === 0 ) {
        hackerActions.getHackerNews({ page: 1, hitsPerPage: 20, query: "foo", tags: "story" });   
      }
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <CssBaseline/>
          <AlertContainer />
          <Routes />
        </Router>
      </ThemeProvider>
  );
}
const mapStateToProps = (state: RootState) => {
	return {
		hacker: state.hacker
	};
}

export default connect(mapStateToProps)(App);
