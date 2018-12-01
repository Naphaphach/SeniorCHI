import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Logo from '../assets/logo.png';
import Header from '../components/main/header'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    [theme.breakpoints.up('sm')]:{
      marginTop: '12%',
      marginBottom: '9%',
    },
    [theme.breakpoints.down('sm')]:{
      marginTop: '20%',
      marginBottom: '9%',
    },
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    color: 'rgb(14,4,123)',
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

function SignUp(props) {
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
          Register
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="repassword">Re-Password</InputLabel>
            <Input name="repassword" type="password" id="repassword" />
          </FormControl>
          <div style={{marginTop: 10}}>
            <b style={{fontSize: 15, float:'left'}}>Birthday: </b>
            <TextField
                id="date"
                name="Birthday"
                type="date"
                defaultValue="1997-01-01"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
          </div>
          <FormGroup>
            <Label for="exampleCustomFileBrowser" style={{fontSize: 15, float:'left'}}><b>File Browser:</b></Label>
            <CustomInput style={{fontSize: 1}} type="file" id="exampleCustomFileBrowser" name="customFile" />
          </FormGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <br/>
          <Link to="/" style={{fontSize:13}}>Cancel</Link>
        </form>
        <p style={{color: 'black', fontSize:12}}>CHI &#174; 2018</p>
      </Paper>
    </main>
  );
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);