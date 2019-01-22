import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { isMobile } from "react-device-detect";
import FavIcon from '@material-ui/icons/Favorite';
import ReportIcon from '@material-ui/icons/ReportProblem';
import { withStyles } from '@material-ui/core/styles';
import img from '../../assets/test1.jpg';
import ListSubheader from '@material-ui/core/ListSubheader';

const styles = theme => ({
    root: {
        width: '70%',
        backgroundColor: theme.palette.background.paper,
        
    },
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
class Notice extends Component {
    render() {
        const { classes} = this.props
        
        return (
            <Home>
                {this.props.auth.uid ?
                    isMobile ?
                    <div className={classes.root}>
                    <List component="nav" className={classes.list}>
                      <ListItem button >
                        <ListItemIcon>
                          <FavIcon />
                        </ListItemIcon>
                        <ListItemText primary="C likes your post." secondary="23 minutes ago"/>
                        <img className={classes.img} alt="complex" src= {img} />  
                      </ListItem>
                      <ListItem button>
                        <ListItemIcon>
                          <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="F reports your post." />
                        <ListItemText secondary="23 minutes ago" />
                        <img className={classes.img} alt="complex" src= {img} />  
                      </ListItem>
                    </List>
                    <Divider />
                  </div>
                    : <div className={classes.root}>
                    <List component="nav" subheader={<ListSubheader component="div" align="left">Notification</ListSubheader>}>
                      <ListItem button className={classes.list}>
                        <ListItemIcon>
                          <FavIcon />
                        </ListItemIcon>
                        <ListItemText primary="C likes your post." secondary="23 minutes ago"/>
                        <img className={classes.img} alt="complex" src= {img} />  
                      </ListItem>
                      <ListItem button className={classes.list}>
                        <ListItemIcon>
                          <ReportIcon />
                        </ListItemIcon>
                        <ListItemText primary="F reports your post."  secondary="23 minutes ago" />
                        <img className={classes.img} alt="complex" src= {img} />  
                      </ListItem>
                    </List>
                    <Divider />
                  </div>
                : <Unregist name='Notice' />}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}
export default withStyles(styles)(connect(mapStateToProps)(Notice))
