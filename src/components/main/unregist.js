import React, {Component, Fragment} from 'react'
import Home from '../../layouts/Home'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'

class unregist extends Component {
    
    render() {
        return(
            <Home>
                <Fragment> {this.props.name} is not available for unregister please <Link to='/upin'><Button color='success'>signup</Button></Link></Fragment>
            </Home>
        )
    }
}

export default unregist
