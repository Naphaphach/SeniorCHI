import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Logo from '../assets/logo.png';
import Header from '../components/main/header'
import { Link } from 'react-router-dom'
import Co from '../components/main/cooperate'

const styles = theme => ({
  main: {
    marginTop: '9%',
    marginBottom: '9%',
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up('sm')]:{
      marginTop: '12%',
      marginBottom: '9%',
    },
    [theme.breakpoints.down('sm')]:{
      marginTop: '20%',
      marginBottom: '9%',
    },
  },
  paper: {
    marginTop: theme.spacing.unit ,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
});

function SignIn(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
    <Header/>
      <CssBaseline />
      <Paper className={classes.paper}>
        {/*<Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>*/}
        <img src={Logo} width="20%" alt="Logo"/>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <br/>
          <Link to="/up" style={{fontSize:13}}>Do you have an account?</Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
          <br/>
        </form>
        <br/>
        <Link to="/" style={{fontSize:13}}>Cancel</Link>
        <p style={{color: 'black', fontSize:12}}>CHI &#174; 2018</p>
        <Co/>
      </Paper>
    </main>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);