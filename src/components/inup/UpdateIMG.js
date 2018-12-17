import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core';
import { Container, Col, Row, CustomInput, FormGroup, Label } from 'reactstrap'
import withStyles from '@material-ui/core/styles/withStyles';
import AvatarE from './avatar'
import Avatar from 'react-avatar'
import { updateProImg } from '../../store/actions/authAction'
import ErrMessage from '../../components/main/errMessage';

const styles = theme => ({
    main: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginTop: '8.5%',
            marginLeft: '3.5%',
            marginBottom: '2.5%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
            marginBottom: '20%',
        },
        color: 'rgb(14,4,123)',
        padding: '1%',
    },
    input: {
        margin: '2.5% 5%',
    },
    profileimg: {
        margin: '1%',
        width: '50% !important',
        height: '50% !important'
    },
    submit: {
        marginTop: theme.spacing.unit,
        width: '50%'
    },
    form: {
        width: '100%',
        margin: '2%'
    },
    row:{
        display: 'block'
    }
})

class UpdateIMG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: null,
            Photo: null,
            show: true
        }
    }

    renderRedirect = () => {
        if (typeof (this.props.auth.uid) === 'undefined') {
            return <Redirect to={'/'} />
        }
    }

    componentWillMount() {
        const { Photo } = this.props.profile
        if (Photo) {
            this.setState({
                Photo
            })
            if (Photo) {
                if (typeof (Photo) === 'object') {
                    this.setState({ show: false })
                } else {
                    if (Photo.includes('facebook')) {
                        this.setState({ show: true })
                    } else {
                        this.setState({ show: false })
                    }
                }
            } else {
                this.setState({ show: true })
            }
        }
    }

    handleChangePhoto(event) {
        if (event.target.files[0]) {
            this.setState({
                Photo: event.target.files[0],
                filename: event.target.files[0].name,
                show: false
            })
        }
    }

    handleClick(e) {
        e.preventDefault();
        this.props.updateProImg(this.state)
    }

    render() {
        const { classes, profile, errproimg, success } = this.props;
        const { filename, Photo, show } = this.state
        return (
            <Home>
                {this.renderRedirect()}
                <Container>
                    <Paper className={classes.main}>
                        <Container>
                            <Row>
                                <Col md='3' xs='12'>
                                    <Label for="exampleCustomFileBrowser" style={{ fontSize: '1em', float: 'left' }}><b>profile image:</b></Label>
                                </Col>
                                <Col>
                                    <Row className={classes.row}>
                                        {show ?
                                            <Avatar name={profile.displayName} src={Photo} round={true} className={classes.profileimg} />
                                            :
                                            <AvatarE ph={Photo} />
                                        }
                                    </Row>
                                    <Row>
                                        <form method="post" onSubmit={(event) => this.handleClick(event)} className={classes.form}>
                                            <FormGroup className={classes.input}>
                                                <CustomInput type="file" id="exampleCustomFileBrowser" accept="image/*" name="customFile" onChange={(event) => this.handleChangePhoto(event)} label={filename} />
                                            </FormGroup>
                                            <ErrMessage err={errproimg} />
                                            <ErrMessage cor={success}/>
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
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
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
        errproimg: state.auth.errproimg,
        erremail: state.auth.erremail,
        success: state.auth.success,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProImg: () => dispatch(updateProImg())
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UpdateIMG));