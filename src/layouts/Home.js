import React, {Component, Fragment} from 'react'
import Header from '../components/main/header'
import Footer from '../components/main/footer'
import { Container } from 'reactstrap'
import {isMobile,} from "react-device-detect";

class Home extends Component {
    render() {
        return(
            <Fragment>
                <Header/>
                    <Container>
                        {this.props.children}
                    </Container>
                {isMobile ? <Footer/> : null}
            </Fragment>
        )
    }
}

export default Home
