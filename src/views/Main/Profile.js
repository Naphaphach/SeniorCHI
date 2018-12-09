import React, {Component} from 'react'
import Home from '../../layouts/Home'
import {Button, FormControl, Input, InputLabel, Paper, TextField} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import {Container, Col, Row, Button as ButtomPW} from 'reactstrap'
import Avatar from 'react-avatar'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
    main:{
        width: '100%',
        [theme.breakpoints.up('sm')]:{
            marginTop: '8.5%',
            marginLeft: '3.5%',
            marginBottom: '2.5%',
            textAlign: 'left',
        },
        [theme.breakpoints.down('sm')]:{
            marginTop: '20%',
            marginBottom: '20%',
            textAlign: 'center',
        },
        color: 'rgb(14,4,123)',
        padding: '1%',
    },
    profileimg:{
        margin: '1%',
        width: '100%',
    },
    img:{
        textAlign: 'center',
    },
    row:{
        margin: '2.5% 0'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
    },
    coin:{
        color: 'gold',
        fontSize: '1.75em',
        margin: '0 5%'
    }
})
class Profile extends Component{
    render(){
        const { classes, profile, auth} = this.props;
        return(
            <Home>
                <Container fluid>
                    <Paper className={classes.main}>
                        <Row className={classes.row}>
                            <Col xs="12" md="4" className={classes.img}>
                                <Avatar name={profile.displayName} src={profile.Photo} round={true} className={classes.profileimg}/>
                            </Col>
                            <Col xs="12" md="8">
                                <Row className={classes.row}>
                                    <FontAwesomeIcon icon={['fas', 'coins']} className={classes.coin}/>{' '}{profile.token}{' token'}
                                </Row>
                                <form className={classes.form} method="post">
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="name">Display name</InputLabel>
                                        <Input id="name" name="name"  value={profile.displayName}/>
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email">Email Address</InputLabel>
                                        <Input id="email" name="email" value={auth.email}/>
                                    </FormControl>
                                    <div style={{marginTop: 10}}>
                                        <b style={{fontSize: 15, float:'left'}}>Birthday: </b>
                                        <TextField
                                            id="date"
                                            name="Birthday"
                                            type="date"
                                            defaultValue={profile.BOD}
                                            className={classes.textField}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                    >
                                        update
                                    </Button>
                                </form>
                                <Row>
                                    <Col className={classes.row}>
                                        <ButtomPW>update password</ButtomPW>
                                    </Col>
                                    <Col className={classes.row}>
                                        <ButtomPW>update profile image</ButtomPW>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Paper>
                </Container>
            </Home>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
    }
  }
export default withStyles(styles)(connect(mapStateToProps)(Profile))