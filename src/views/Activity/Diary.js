import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../layouts/Home'
import Unregist from '../../components/main/unregist'
class Diary extends Component {
    render() {
        return (
            <Home>
                {this.props.auth.uid ?
                    'Diary is not available'
                    : <Unregist name='Diary' />}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Diary)
