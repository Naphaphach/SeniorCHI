import React, {Component, Fragment} from 'react'
import Header from '../components/main/header'
import Footer from '../components/main/footer'
import { Container } from 'reactstrap'

class Home extends Component {
    render() {
        return(
            <Fragment>
                <Header/>
                    <Container>
                        {this.props.children}
                    </Container>
                <Footer/>
            </Fragment>
        )
    }
}

export default Home
