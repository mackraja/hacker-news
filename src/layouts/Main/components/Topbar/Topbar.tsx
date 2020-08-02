import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import logoImg from '../../../../style/images/logos/hacker-news-logo.png';

interface TopbarProps {
  className?: string,
  onSidebarOpen: () => void,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  imgClass: {
    width: 36
  },
  title: {
    flexGrow: 1,
    color: "#FFFFFF",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Topbar = (props: TopbarProps) => {
  const { className, onSidebarOpen, ...rest } = props;
  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <RouterLink to="/">
              <img
                alt="Logo"
                src={logoImg}
                className={classes.imgClass}
              />
            </RouterLink>
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Hacker News Dashboard
          </Typography>
          <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        </Toolbar>      
    </AppBar>
  );
};

export default Topbar;
