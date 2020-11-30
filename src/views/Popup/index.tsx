import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { sendMessage } from './services';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ListLink } from './components/List';
import { Suspense } from './components/Suspense';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
    },
    fallback: {
      width: 400,
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

const Popup: React.FC = () => {
  const classes = useStyles();
  const [links, setLinks] = useState<string[]>([]);

  useEffect(() => {
    async function getLinks() {
      const response = await sendMessage();
      setLinks(response);
    }

    getLinks();
  }, []);

  const Fallback = () => (
    <div className={classes.fallback}>
      <Typography variant="subtitle1">
        It looks like this page has no magnet links to list.
      </Typography>
    </div>
  )

  return (
    <React.Fragment>
      <Header />
      <Suspense condition={links.length > 0} fallback={<Fallback />}>
        <List className={classes.root}>
          {links.map((link) => (
            <ListLink key={link} link={link} />
          )
          )}
        </List>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default Popup;
