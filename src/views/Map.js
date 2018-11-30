import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import map from '../assets/map.svg';
import injectSheet from 'react-jss';
import Header from '../components/main/header'
import Footer from '../components/main/footer'

// Create your Styles. Remember, since React-JSS uses the default preset,
// most plugins are available without further configuration needed.
const styles = {
    map:{
        width: '100%',
        objectFit: 'fill',
        margin: '9%'
    }
}
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: '',
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <Fragment >
                <Header/>
                <img src={map} alt="map" className={classes.map}/>
                <Footer/>
            </Fragment>
        )
    }    
}

Map.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Map)

