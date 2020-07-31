import React, { useState } from 'react';
import clsx from 'clsx';
import { Theme } from "@material-ui/core/styles";
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link,  
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

interface newsData {
  author: string
  comment_text: null | string
  created_at: string
  created_at_i: number
  num_comments: number
  objectID: string | number
  parent_id: null | number
  points: number
  story_id: null | number
  story_text: null | string
  story_title: null | string
  story_url: null | string
  title: string
  url: string
}

interface NewsTableProps {
  news: any[],
  page: number,
  setPage: (page: number) => void,
  rows: number,
  setRows: (row: any) => void,
  totalPage: number,
  setUpVote: (objectId: any) => void,
  setDelete: (objectId: any) => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  tableCellBold: {
    fontWeight: 'bold'
  },
}));

const NewsTable = (props: NewsTableProps) => {
  const { news, page, setPage, rows, setRows, totalPage, setUpVote, setDelete } = props;

  const classes: any = useStyles();
  const [selectedUsers] = useState<any>([]);
  
  const getBaseUrl = (url: string) => {
    let urlArr = url && url.split('/');
    return url ? urlArr[0] + '//' + urlArr[2] : '';
  };

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableCellBold}>Comments</TableCell>
                  <TableCell className={classes.tableCellBold}>Vote Count</TableCell>
                  <TableCell className={classes.tableCellBold}>UpVote</TableCell>
                  <TableCell className={classes.tableCellBold}>News Details</TableCell>
                  <TableCell className={classes.tableCellBold}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {news.slice(0, rows).map((val: newsData) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={val.objectID}
                    selected={selectedUsers.indexOf(val.objectID) !== -1}
                  >
                    <TableCell>{val.num_comments}</TableCell>
                    <TableCell>{val.points}</TableCell>
                    <TableCell>
                      <Tooltip title="UpVote">
                        <IconButton
                          key="upVote"
                          aria-label="upVote"
                          color="inherit"
                          onClick={() => setUpVote(val.objectID)}                         
                         >
                          <ArrowDropUpIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Breadcrumbs separator="-" aria-label="breadcrumb">
                        <Typography variant="h5">
                          {val.title}
                        </Typography>
                        <Link color="primary" href={`${getBaseUrl(val.url)}`}>
                          {`${getBaseUrl(val.url)}`}
                        </Link>
                        <Typography variant="h5">
                          by {val.author}
                        </Typography>
                        <Typography variant="h5">
                          {moment(val.created_at).format('DD/MM/YYYY hh:mm a')}
                        </Typography>
                      </Breadcrumbs>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton
                          key="delete"
                          aria-label="delete"
                          color="inherit"
												  onClick={() => setDelete(val.objectID)}
                         >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={rows * totalPage}
          onChangePage={(e, v) => setPage(v)}
          onChangeRowsPerPage={(e) => setRows(e.target.value)}
          page={page - 1}
          rowsPerPage={rows}
          rowsPerPageOptions={[10, 20]}
        />
      </CardActions>
    </Card>
  );
};

export default NewsTable;
