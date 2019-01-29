import React, { Component } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ReportIcon from '@material-ui/icons/ReportProblem';
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

class notiObj extends Component {

    render() {
        const { classes } = this.props
        return (
                <ListItem button className={classes.list}>
                    <ListItemIcon>
                        <ReportIcon />
                    </ListItemIcon>
                    <ListItemText primary="F reports your post." secondary="23 minutes ago" />
                    <img className={classes.img} alt="complex" src={img} />
                </ListItem>
        )
    }

}

export default withStyles(styles)(notiObj)
