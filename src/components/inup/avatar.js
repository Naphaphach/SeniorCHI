import React, { Component, Fragment } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col, Button } from 'reactstrap'
import injectSheet from 'react-jss';
import { isIOS } from 'react-device-detect'
import { connect } from 'react-redux'
import { changeImgProfile } from '../../store/actions/imgAction'
import PropTypes from 'prop-types';

const styles = {
    start: {
        fontSize: '10em',
    },
    set: {
        width: '100%',
        height: '100%'
    }
}

class AvatarE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: this.props.ph,
            rotate: 0,
            zoom: 1.2
        }
    }

    componentDidMount() {
        if (isIOS) {
            this.setState({
                rotate: 90
            })
        }
    }

    onClickSave = () => {
        if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
            const canvas = this.editor.getImage()
            this.props.changeImgProfile(canvas.toDataURL('png', 1))
        }
    }

    wheel = (e) => {
        if (e.deltaY < 0) {
            this.setState({ zoom: this.state.zoom + 0.1 })
        }
        if (e.deltaY > 0) {
            this.setState({ zoom: this.state.zoom - 0.1 })
        }
    }

    setEditorRef = (editor) => this.editor = editor
    render() {
        const { classes, ph } = this.props
        const { rotate, zoom } = this.state

        return (
            <Fragment>
                {ph ?
                    <Container fluid>
                        <AvatarEditor
                            image={ph}
                            border={25}
                            color={[128, 128, 128, 0.6]} // RGBA
                            scale={zoom}
                            rotate={rotate}
                            borderRadius={360}
                            className={classes.set}
                            ref={this.setEditorRef}
                            onLoadSuccess={(imgInfo) => this.onClickSave()}
                            onImageChange={this.onClickSave}
                            onWheel={(e) => this.wheel(e)}
                        />
                        <Row>
                            <Col xs='4'>
                                <Button onClick={() => this.setState({ rotate: this.state.rotate - 90 })}><FontAwesomeIcon icon={['fas', 'undo']} /> Left </Button>
                            </Col>
                            <Col xs='4'>
                            </Col>
                            <Col xs='4'>
                                <Button onClick={() => this.setState({ rotate: this.state.rotate + 90 })}> right <FontAwesomeIcon icon={['fas', 'redo']} /> </Button>
                            </Col>
                        </Row>
                    </Container> :
                    <Container fluid className={classes.start}>
                        <FontAwesomeIcon icon={['far', 'images']} />
                    </Container>}
            </Fragment>
        )
    }
}

AvatarE.propTypes = {
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
        changeImgProfile: user => dispatch(changeImgProfile(user))
    }
}

export default injectSheet(styles)(connect(mapStateToProps, mapDispatchToProps)(AvatarE))