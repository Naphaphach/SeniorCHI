import React, {Component, Fragment} from 'react'
import Header from '../components/main/header'
import Footer from '../components/main/footer'
import {Container} from 'reactstrap'

class Diary extends Component {
    render() {
        return(
            <Fragment>
                <Header/>
                    <Container>
                        Diary is not available
                    </Container>
                <Footer/>
            </Fragment>
        )
    }
}

export default Diary
