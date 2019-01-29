import React, { Component } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import token from '../../assets/peacock.png';
import { connect } from 'react-redux'
import Avatar from 'react-avatar'

const styles = theme => ({
    list: {
        '&:hover': {
            backgroundColor: '#FFCC99',
            borderColor: '#FFCC99',
        },
    },
    image: {
        width: '40px',
        height: '40px',
        margin: '0 5%',
    },
});

class notiObj extends Component {

    render() {
        const { classes, data, profile } = this.props
        console.log(data.data);

        return (
            <ListItem button className={classes.list} key={data.id} >
                <ListItemIcon>
                    <img className={classes.image} alt="complex" src={token} />
                </ListItemIcon>
                <ListItemText primary={data.data.content} secondary={Date(data.data.date)} />
                <Avatar name={profile.displayName} size="40" src={profile.Photo} />
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
