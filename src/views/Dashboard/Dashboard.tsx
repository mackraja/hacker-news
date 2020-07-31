import React from 'react';
import { connect } from "react-redux";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/styles';
import { useActions, hackerAction } from "../../actions";
import { RootState } from "../../redux/reducers";

import {    
  NewsTable
} from './components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = (props? : any) => {
  const classes = useStyles();

  const { hacker = {} } = props && props.hacker;
  const { news = [], pageNo = 1, rowsPerPage = 20, totalPage = 50 } = hacker;

  const [page, setPage] = React.useState(pageNo);
  const [rows, setRows] = React.useState(rowsPerPage);
  const hackerActions = useActions(hackerAction);

  const handleSetPage = (page: number) => {
    setPage(page + 1);
    hackerActions.getFilteredNews({ page: page + 1, hitsPerPage: rows, query: "foo", tags: "story" });
  };

  const handleSetRows = (rows: number) => {
    setRows(rows);
    hackerActions.getFilteredNews({ page: page, hitsPerPage: rows, query: "foo", tags: "story" });
  };

  const handleUpVote = (objectID: string) => {
    hackerActions.getActionNews(objectID, 'upVote');
  };

  const handleDelete = (objectID: string) => {
    hackerActions.getActionNews(objectID, 'delete');
  };

  return (
    <div className={classes.root}>
      {
        news && 
        <NewsTable
          news={news}
          page={page}
          setPage={handleSetPage}
          rows={rows}
          setRows={handleSetRows}
          totalPage={totalPage}
          setUpVote={handleUpVote}
          setDelete={handleDelete}
        />
      }      
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
	return {
		hacker: state.hacker
	};
}

export default connect(mapStateToProps)(Dashboard);
