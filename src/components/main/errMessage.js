import React, { Component, Fragment } from 'react'
import injectSheet from 'react-jss';
import PropTypes from 'prop-types'

const styles = {
    err: {
        color: 'Red',
        fontSize: '.5em',
        marginTop: '5%'
    },
    suc: {
        color: 'Green',
        fontSize: '.5em',
        marginTop: '5%'
    }
}


class errMessage extends Component {
    render() {
        const { classes, err, cor } = this.props
        return (
            <Fragment>
                {err ? <p className={classes.err}> {err} </p> : null}
                {cor ? <p className={classes.suc}> success and you need to login agian </p> : null}
            </Fragment>
        )
    }
}

errMessage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(errMessage)