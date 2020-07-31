import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Chart } from "react-google-charts";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,  
} from '@material-ui/core';

interface NewsGraphProps {
  news: any[],
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  content: {
    padding: 0
  },  
}));

const NewsGraph = (props: NewsGraphProps) => {
  const { news } = props;

  const [voteGraphArr, setVoteGraphArr] = useState([]);
  const [commentGraphArr, setCommentGraphArr] = useState([]);

  useEffect(() => {
    let voteArr: any = [];
    let commentArr: any = [];

    news.forEach((val, key) => {
      let nestedVoteArr: any = [];
      let nestedCommentArr: any = [];
      for (let i=1; i<=1; i++) {        
        nestedVoteArr.push(key, val.points);
        nestedCommentArr.push(key, val.num_comments);
      }
      voteArr.push(nestedVoteArr);
      commentArr.push(nestedCommentArr);
    });
    const finalVoteArr: any = [['x', 'Votes']].concat(voteArr);
    const finalCommentArr: any = [['x', 'Comments']].concat(commentArr);

    setVoteGraphArr(finalVoteArr);
    setCommentGraphArr(finalCommentArr);
  }, [news]);


  const classes: any = useStyles();  

  return (
    <Card
      className={clsx(classes.root)}
    >
      <CardContent className={classes.content}>
      <Chart
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={voteGraphArr}
        options={{
          hAxis: {
            title: 'News Id',
          },
          vAxis: {
            title: 'Votes',
          },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      <Chart
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={commentGraphArr}
        options={{
          hAxis: {
            title: 'News Id',
          },
          vAxis: {
            title: 'Comments',
          },
        }}
        rootProps={{ 'data-testid': '2' }}
      />
      </CardContent>      
    </Card>
  );
};

export default NewsGraph;
