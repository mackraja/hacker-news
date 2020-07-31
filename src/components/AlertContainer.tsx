import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import { Alert } from '../model'
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useActions, hackerAction } from "../actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: theme.palette.success.main,
    },
    warning: {
      backgroundColor: theme.palette.warning.main,
    },
    info: {
      backgroundColor: theme.palette.info.main,
    },
    error: {
      backgroundColor: theme.palette.error.main,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '15px'
    },
  }),
);
const AlertContainer = () => {
  const hackerActions = useActions(hackerAction);
  const props: Alert = useSelector((state: RootState) => state.alert);
  const { message, statusCode } = props;
  
  const openState: any = !!message;

  const classes = useStyles();
  const [alert, setAlert] = React.useState<boolean>(openState);

  React.useEffect(() => {
    setAlert(openState);
  }, [openState]);

  let variantIcon: any = {};
  variantIcon[200] = CheckCircleIcon;
  variantIcon[100] = WarningIcon;
  variantIcon[105] = ErrorIcon;

  const Icon = variantIcon[statusCode];

  if (!statusCode) {
    return <React.Fragment />;
  }

  function handleClose (event: React.SyntheticEvent | React.MouseEvent, reason?: string) {
    hackerActions.closeAlert();
    if (reason === 'clickaway') {
      return;
    }
    setAlert(false);
  }

  let statusCodeBar: any = {};
  statusCodeBar[200] = classes.success;
  statusCodeBar[100] = classes.warning;
  statusCodeBar[105] = classes.info;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      key={"top,center"}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      open={alert}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={statusCodeBar[statusCode] || classes.error}
        message={<span id="message-id" className={classes.message}><Icon className={clsx(classes.icon, classes.iconVariant)} />{message}</span>}
        action={[<IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>]}
      />
    </Snackbar>
  )
}

export default AlertContainer;