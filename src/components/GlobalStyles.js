import createStyles from '@material-ui/styles/createStyles';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%'
      },
      body: {
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%'
      },
      a: {
        textDecoration: 'none'
      },
      '#root': {
        height: '100%',
        width: '100%'
      },
      button: {
        borderRadius: '8px !important',
        padding: '10px 20px !important'
      },
      '.MuiInputBase-root': {
        borderRadius: '8px !important'
      }
    }
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
