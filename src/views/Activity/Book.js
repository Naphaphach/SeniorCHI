import React, {Component} from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
class Book extends Component {
    render() {
        return(
            <Home>
                {this.props.auth.uid ?
                'Book is not available'
                : <Unregist name='Book'/>}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
  }

export default connect(mapStateToProps)(Book)
