import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp';
import CopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
  link: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      display: 'flex',
      alignItems: 'flex-end',
      padding: 15,
    },
    itemText: {
      minWidth: 250,
      maxWidth: 250,
    },
    text: {
      overflowWrap: 'break-word',
    },
  }),
);

const ListLink: React.FC<Props> = ({ link }) => {
  const classes = useStyles();

  const getDisplayName = () => {
    const dn = link.match(/((?<=dn=)[^& ]*)/gmi);
    let displayName = 'Unkown name';

    if (dn) {
      try {
        displayName = decodeURI(dn[0]);
      } catch { }
    }

    return displayName;
  }

  const handleDownload = () => window.open(link);

  async function handleCopy() {
    await navigator.clipboard.writeText(link);
  }

  const displayName = getDisplayName();

  return (
    <React.Fragment>
      <ListItem key={link} role={undefined} dense>
        <div className={classes.itemText}>
          <ListItemText className={classes.text} id={link} primary={displayName} />
        </div>
        <div className={classes.icon}>
          <ListItemIcon>
            <Tooltip title="Copy">
              <IconButton edge="end" onClick={handleCopy}>
                <CopyIcon />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
          <ListItemIcon>
            <Tooltip title="Download">
              <IconButton edge="end" onClick={handleDownload}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
        </div>
      </ListItem>
      <Divider />
    </React.Fragment>
  )
};

export { ListLink };
