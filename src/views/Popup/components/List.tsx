import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp';
import CopyIcon from '@material-ui/icons/FileCopy';
import Typography from '@material-ui/core/Typography';
import { Suspense } from './Suspense';

interface Props {
  links: string[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fallback: {
      width: 400,
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    root: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
    },
    icon: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: 15,
    },
    itemText: {
      width: 250,
    },
    text: {
      overflowWrap: 'break-word',
    },
  }),
);

const ListLink: React.FC<Props> = ({ links }) => {
  const classes = useStyles();

  const getDisplayName = (link: string) => {
    const dn = link.match(/((?<=dn=)[^& ]*)/gmi);
    let displayName = 'Unkown name';

    if (dn) {
      try {
        displayName = decodeURI(dn[0]);
      } catch { }
    }

    return displayName;
  }

  const handleDownload = (link: string) => window.open(link);

  async function handleCopy(link: string) {
    await navigator.clipboard.writeText(link);
  }

  const Fallback = () => {
    if (links.length === 0) {
      return (
        <div className={classes.fallback}>
          <Typography variant="subtitle1">
            It looks like this page has no magnet links to list.
          </Typography>
        </div>
      )
    }

    return (
      <p>Carregando...</p>
    )
  }

  const MapList = () => (
    <List className={classes.root}>
      {links.map((link) => {
        const displayName = getDisplayName(link).replace('.', ' ');

        return (
          <React.Fragment>
            <ListItem key={link} role={undefined} dense>
              <div className={classes.itemText}>
                <ListItemText className={classes.text} id={link} primary={displayName} />
              </div>
              <div className={classes.icon}>
                <ListItemIcon >
                  <IconButton edge="end" title="Copy the magnet link" onClick={() => handleCopy(link)}>
                    <CopyIcon />
                  </IconButton>
                </ListItemIcon>
                <ListItemSecondaryAction >
                  <IconButton edge="end" title="Download" onClick={() => handleDownload(link)}>
                    <DownloadIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </div>
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      }
      )}
    </List>
  )

  return (
    <React.Fragment>
      <Suspense condition={links.length > 0} fallback={<Fallback />}>
        <MapList />
      </Suspense>
    </React.Fragment>
  )
}

export { ListLink };
