import React, {Component} from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
class Feed extends Component {
    render() {
        return(
            <Home>
                {this.props.auth.uid ?
                'Feed is not available'
                : <Unregist name='Feed'/>}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
  }


export default connect(mapStateToProps)(Feed)
