import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import product_1 from '../../style/images/products/product_1.png';
import product_2 from '../../style/images/products/product_2.png';
import product_3 from '../../style/images/products/product_3.png';
import product_4 from '../../style/images/products/product_4.png';
import product_5 from '../../style/images/products/product_5.png';

const data = [
  {
    id: 1,
    name: 'Dropbox',
    imageUrl: product_1,
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: 2,
    name: 'Medium Corporation',
    imageUrl: product_2,
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: 3,
    name: 'Slack',
    imageUrl: product_3,
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: 4,
    name: 'Lyft',
    imageUrl: product_4,
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: 5,
    name: 'GitHub',
    imageUrl: product_5,
    updatedAt: moment().subtract(9, 'hours')
  }
];

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const NewsFeed = ({ ...rest }) => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <Card
      className={clsx(classes.root)}
      {...rest}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="News Feed"
      />
      <Divider />
      <List>
        {products.map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={product.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.name}
              secondary={`Updated ${product.updatedAt.fromNow()}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default NewsFeed;
