import React, { Component } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import UserIcon from '@material-ui/icons/SupervisorAccount';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Avatar from 'react-avatar'

const styles = theme => ({
    list: {
        '&:hover': {
            backgroundColor: '#FFCC99',
            borderColor: '#FFCC99',
        },
    },
});

class notiObj extends Component {

    render() {
        const { classes, data, profile } = this.props
        return (
            <ListItem button className={classes.list} key={data.id}>
                <ListItemIcon>
                    <UserIcon />
                </ListItemIcon>
                <ListItemText primary={data.data.content} secondary={Date(data.data.date)} />
                <Avatar name={profile.displayName} size="40" src={profile.Photo}/>
            </ListItem>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(notiObj))
