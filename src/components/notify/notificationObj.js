import React, { Component, Fragment } from 'react'
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import FavIcon from '@material-ui/icons/Favorite';
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
            <Fragment>
                <List component="nav" subheader={<ListSubheader component="div" align="left">Notification</ListSubheader>}>
                    <ListItem button className={classes.list}>
                        <ListItemIcon>
                            <FavIcon />
                        </ListItemIcon>
                        <ListItemText primary="C likes your post." secondary="23 minutes ago" />
                        <img className={classes.img} alt="complex" src={img} />
                    </ListItem>
                    <ListItem button className={classes.list}>
                        <ListItemIcon>
                            <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="F reports your post." secondary="23 minutes ago" />
                        <img className={classes.img} alt="complex" src={img} />
                    </ListItem>
                </List>
            </Fragment>
        )
    }

}

export default withStyles(styles)(notiObj)