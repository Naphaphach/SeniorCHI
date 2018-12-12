import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {CssBaseline, Paper, Typography} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Logo from '../../assets/logo.png';
import Header from '../../components/main/header'
import Co from '../../components/main/cooperate'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Container, Row, Col } from 'reactstrap';
import { signinwithfb } from '../../store/actions/authAction'
import ErrMessage from '../../components/main/errMessage';

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
  form: {
    marginTop: theme.spacing.unit * 3,
    width: '100%', // Fix IE 11 issue.
  },
  in:{
    marginTop: theme.spacing.unit * 5,
    width: '100%', // Fix IE 11 issue.
    backgroundColor: 'DarkGray'
  }
});

class InUp extends Component {
  constructor(props){
    super(props);
    this.state = {err: null};
  }
  
  renderRedirect = () => {
    if (typeof(this.props.auth.uid) !== 'undefined'){
      if(this.props.auth.email && !this.props.auth.emailVerified){
        window.open('https://www.'+this.props.auth.email.split("@")[1], '_blank');
      }
      return <Redirect to={'/'} />
    }
  }

  signinwithfb = () => {
      this.props.signinwithfb()
      this.setState({err: this.props.err})
  }

  render(){
    const { classes } = this.props;
    const { err } = this.state;
    return (
      <main className={classes.main}>
      {this.renderRedirect()}
      <Header/>
        <CssBaseline />
        <Paper className={classes.paper}>
          <img src={Logo} width="50%" alt="Logo"/>
          <Typography component="h1" variant="h5">
            Learn india culture with Chi 𝜒
          </Typography>
          <Container>
              <Row>
                <Col>
                    <Button color="primary" className={classes.form} onClick={() => this.signinwithfb()}>Continue with Facebook</Button>
                </Col>
            </Row>
          <ErrMessage err={err}/>
            <Row>
                <Col>
                    <Link to='/up'>
                        <Button color="success" className={classes.form}>Sign up with email</Button>
                    </Link>
                </Col>
            </Row>
          </Container>
          <Container>
            <Row>
                <Col>
                    <Link to='/in'>
                        <Button className={classes.in}>Log in</Button>
                    </Link>
                </Col>
            </Row>
          </Container>
          <br/>
          <Link to="/" style={{fontSize:13}}>Cancel</Link>
          <p style={{color: 'black', fontSize:12}}>CHI &#174; 2018</p>
          <Co/>
        </Paper>
      </main>
    )
  }
}

InUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    err: state.auth.errsignin,
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signinwithfb: () => dispatch(signinwithfb())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InUp));