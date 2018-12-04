import React, {Component} from 'react'
import injectSheet from 'react-jss';
import PropTypes from 'prop-types'
import Mu from '../../assets/MU Symbol- Full Colour.png'
import ICT from '../../assets/customLogo.gif.png'
import Bh from '../../assets/Logo_BharatMahidol_Feb2016.png'
import {Container, Row, Col} from 'reactstrap'

const styles = {
    mulogo:{
        width: '100%',
        verticalAlign: 'bottom',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        margin: '50% -50% 0 50%'
    },
}

class Cooperate extends Component {
    render() {
        const { classes } = this.props;

        return(
            <Container>
                <Row>
                    <Col>
                        <img src={ICT} alt="ICT" className={classes.mulogo}/>
                    </Col>
                    <Col>
                        <img src={Mu} alt="Mu" className={classes.mulogo}/>
                    </Col>
                    <Col>
                        <img src={Bh} alt="Bh" className={classes.mulogo}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

Cooperate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Cooperate)

