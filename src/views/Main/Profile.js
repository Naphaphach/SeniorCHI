import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { Button, FormControl, Input, InputLabel, Paper, TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { Container, Col, Row, Button as ButtomPW, Alert } from 'reactstrap'
import Avatar from 'react-avatar'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateNameEmailDOB, updatePWD } from '../../store/actions/authAction'
import ErrMessage from '../../components/main/errMessage';
import { Redirect, Link } from 'react-router-dom'
import { changeMenu } from "../../store/actions/mapAction";

const styles = theme => ({
    main: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginTop: '8.5%',
            marginLeft: '3.5%',
            marginBottom: '2.5%',
            textAlign: 'left',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
            marginBottom: '20%',
            textAlign: 'center',
        },
        color: 'rgb(255,153,51)',
        padding: '1%',
    },
    profileimg: {
        margin: '1%',
        width: '90% !important',
        height: '100% !important',
    },
    img: {
        textAlign: 'center',
    },
    row: {
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
    coin: {
        color: 'gold',
        fontSize: '1.5em',
        margin: '0 5%'
    },
    Alert: {
        fontSize: '0.75em',
    },
    notise: {
        fontSize: '0.6em',
    }
})
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: this.props.auth.email,
            uid: this.props.auth.uid,
            DOB: this.props.profile.DOB,
            displayName: this.props.profile.displayName,
            visible: true,
            success: this.props.success,
            click: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClick(e) {
        e.preventDefault();
        this.setState({click: 1})
        this.props.updateNameEmailDOB(this.state);
    }

    onDismiss() {
        this.setState({ visible: false });
    }


    renderRedirect = () => {
        if (!this.props.auth.uid) {
            return <Redirect to={'/'} />
        }
    }

    componentDidUpdate(){
        if (this.props.success) {
            this.setState({success: this.props.success})
        }
        if (this.state.click === 1) {
            this.props.changeMenu('/profile')   
        }
    }

    render() {
        const { classes, profile, errprofile, erremail, auth } = this.props;
        return (
            <Home>
                <Container fluid>
                    <Paper className={classes.main}>
                        {!auth.emailVerified && this.state.newEmail ?
                            <Alert color="danger" className={classes.Alert} isOpen={this.state.visible} toggle={this.onDismiss} >
                                your email is not verified <a href={'https://www.' + this.state.newEmail.split("@")[1]} target="_blank" rel="noopener noreferrer"><ButtomPW onClick={this.onDismiss}>open email</ButtomPW></a>
                                <br />
                                <span className={classes.notise}>if this massege display, and it annoys you, you can close it.</span>
                                <br />
                                <span className={classes.notise}>if you've already verified your email, you should log in agian.</span>
                            </Alert> : null}
                        <Row className={classes.row}>
                            <Col xs="12" md="4" className={classes.img}>
                                <Avatar name={profile.displayName} src={profile.Photo} round={true} className={classes.profileimg} />
                            </Col>
                            <Col xs="12" md="8">
                                <Row className={classes.row}>
                                    <FontAwesomeIcon icon={['fas', 'coins']} className={classes.coin} />{' '}{profile.token}{' token'}
                                </Row>
                                <form className={classes.form} method="post" onSubmit={(event) => this.handleClick(event)}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="name">Display name</InputLabel>
                                        <Input id="name" name="name" value={this.state.displayName} onChange={this.handleChange('displayName')} />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="email">Email Address</InputLabel>
                                        <Input id="email" name="email" value={this.state.newEmail} onChange={this.handleChange('newEmail')} />
                                    </FormControl>
                                    <div style={{ marginTop: 10 }}>
                                        <b style={{ fontSize: 15, float: 'left' }}>Birthday: </b>
                                        <TextField
                                            id="date"
                                            name="Birthday"
                                            type="date"
                                            defaultValue={this.state.DOB}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={this.handleChange('DOB')}
                                        />
                                    </div>
                                    <ErrMessage err={errprofile} />
                                    <ErrMessage err={erremail} />
                                    <ErrMessage cor={this.state.success} path={'/profile'}/>
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
                                    {this.state.newEmail ?
                                        <Col className={classes.row}>
                                            <a href={'https://www.' + this.state.newEmail.split("@")[1]} target="_blank" rel="noopener noreferrer">
                                                <ButtomPW onClick={() => this.props.updatePWD(this.state)}>update password</ButtomPW>
                                            </a>
                                        </Col> : null}
                                    <Col className={classes.row}>
                                        <Link to='/profile/img'><ButtomPW onClick={() => this.props.changeMenu('/profile/img')}>update profile image</ButtomPW></Link>
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
        errprofile: state.auth.errprofile,
        erremail: state.auth.erremail,
        success: state.auth.success,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNameEmailDOB: valueState => dispatch(updateNameEmailDOB(valueState)),
        updatePWD: valueState => dispatch(updatePWD(valueState)),
        changeMenu: Menu => dispatch(changeMenu(Menu))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Profile))