import React, {Component} from 'react'
import PropTypes from 'prop-types';
//import map from '../assets/map.svg';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    state:{
        width: "100%",
        color: 'black',
        [theme.breakpoints.up('sm')]: {
            margin: '45% 0',
            width: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '20%',
            width: 'auto',
        },
    }
})

class Detail extends Component {
    render() {
        const { name, classes } = this.props;
        return(
            <div className={classes.state}>
                {name}
            </div>
        )
    }
}

Map.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};

export default withStyles(styles)(Detail)