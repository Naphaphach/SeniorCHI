import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ( {
    root:{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'rgb(162,224,120)',
        color: 'green',
        [theme.breakpoints.up('sm')]: {
            display: "none"
        },
        fontSize: '1.5em',
    }
})

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'recents',
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return(
            <BottomNavigation value={value} onChange={this.handleChange} className={classes.root} showLabels>
                <BottomNavigationAction label="map" value="map" icon={<FontAwesomeIcon icon={['fas', 'map-marked-alt']} />} />
                <BottomNavigationAction label="diary" value="diary" icon={<FontAwesomeIcon icon={['fas', 'file-signature']} />} />
                <BottomNavigationAction label="feed" value="feed" icon={<FontAwesomeIcon icon={['fas', 'newspaper']} />} />
                <BottomNavigationAction label="bookmark" value="bookmark" icon={<FontAwesomeIcon icon={['fas', 'bookmark']} />} />
                <BottomNavigationAction label="notice" value="notice" icon={<FontAwesomeIcon icon={['fas', 'bell']} />} />
            </BottomNavigation>
        )
    }    
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer)

