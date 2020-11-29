import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      flexGrow: 1,
      height: '40px',
      position: 'sticky',
      bottom: 0,
    },
    typography: {
      marginLeft: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
    },
    icon: {
      marginLeft: theme.spacing(1),
    }
  }),
);

const Footer: React.FC = () => {
  const classes = useStyles();
  const github = 'https://github.com/RaulNicoletti/get-magnet-links';
  const handleClick = () => window.open(github);

  return (
    <Paper className={classes.root} elevation={10}>
      <Typography className={classes.typography} variant="caption" color="inherit">
        See on github
        <GitHubIcon className={classes.icon} titleAccess={github} onClick={handleClick} cursor="pointer" />
      </Typography>
    </Paper>
  )
}

export { Footer };
