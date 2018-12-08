import React, {Component, Fragment} from 'react'
import Header from '../../components/main/header'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Profile extends Component{
    renderRedirect = () => {
        if (typeof(this.props.auth.uid) === 'undefined'){
          return <Redirect to={'/'} />
        } else {
            if (this.props.Menu !== window.location.pathname) {
                return <Redirect to={this.props.Menu} />
            }
        }
      }

    render(){
        return(
            <Fragment>
                {this.renderRedirect()}
                <Header/>
                1
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      auth: state.firebase.auth,
      Menu: state.map.Menu,
    }
  }

export default connect(mapStateToProps)(Profile)