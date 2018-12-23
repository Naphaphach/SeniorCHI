import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core';
import { Container, Col, Row, CustomInput, FormGroup, Label, Button as ButtomPW } from 'reactstrap'
import withStyles from '@material-ui/core/styles/withStyles';
import AvatarE from './avatar'
import Avatar from 'react-avatar'
import { updateProImg } from '../../store/actions/authAction'
import ErrMessage from '../../components/main/errMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { changeMenu } from "../../store/actions/mapAction";
import { Redirect } from 'react-router-dom'

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
    row: {
        display: 'block'
    }
})

class UpdateIMG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename: null,
            Photo: null,
            show: true,
            menu: '/profile/img'
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
        if (this.props.menu) {
            this.props.changeMenu(this.props.menu);

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

    renderRedirect = (value) => {
        if (value !== window.location.pathname) {
            this.props.changeMenu(value);
            return <Redirect to={value} />
        }
    }

    render() {
        const { classes, profile, errproimg, success } = this.props;
        const { filename, Photo, show, menu } = this.state
        return (
            <Home>
                {this.renderRedirect(menu)}
                <Container>
                    <Paper className={classes.main}>
                        <Container>
                            <Row>
                                <Col md='3' xs='12'>
                                    <Row>
                                        <Col xs='1'><ButtomPW color="link" onClick={() => { this.setState({ menu: '/profile' }) }}><FontAwesomeIcon icon={['fas', 'chevron-left']} /></ButtomPW></Col>
                                        <Col xs='11'>
                                            <Label for="exampleCustomFileBrowser" style={{ fontSize: '1em', float: 'left' }}><b>profile image:</b></Label>
                                        </Col>
                                    </Row>
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
                                            <ErrMessage cor={success} />
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
        menu: state.map.Menu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProImg: () => dispatch(updateProImg()),
        changeMenu: Menu => dispatch(changeMenu(Menu))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UpdateIMG));