import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
    root:{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'rgb(162,224,120)',
        color: 'green'
    }
}

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
            <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>
                <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="Folder" value="folder" icon={<Icon>1</Icon>} />
            </BottomNavigation>
        )
    }    
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Footer)

