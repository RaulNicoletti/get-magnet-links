import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      minWidth: '200px',
      marginBottom: '60px',
    },
    appBar: {
      height: '60px',
      position: 'fixed',
    },
  }),
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar variant="regular">
          <Typography variant="subtitle1" color="inherit">
            Get Magnet Links
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export { Header };
