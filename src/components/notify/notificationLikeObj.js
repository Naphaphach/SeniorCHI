import React, { Component } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import FavIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import img from '../../assets/test1.jpg'

const styles = theme => ({
    list: {
        '&:hover': {
            backgroundColor: '#FFCC99',
            borderColor: '#FFCC99',
        },
    },
    img: {
        width: 'auto',
        height: 'auto',
        margin: 'right',
        display: 'block',
        maxWidth: '20%',
        maxHeight: '20%%',
    },

});

class notiLikeObj extends Component {

    render() {
        const { classes } = this.props
        return (
            <ListItem button className={classes.list}>
                <ListItemIcon>
                    <FavIcon />
                </ListItemIcon>
                <ListItemText primary="C likes your post." secondary="23 minutes ago" />
                <img className={classes.img} alt="complex" src={img} />
            </ListItem>
        )
    }

}

export default withStyles(styles)(notiLikeObj)
