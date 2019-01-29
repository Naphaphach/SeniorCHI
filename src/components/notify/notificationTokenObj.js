import React, { Component } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import token from '../../assets/peacock.png';
import { connect } from 'react-redux'
import Avatar from 'react-avatar'
import { changeMenu } from "../../store/actions/mapAction";
import { checkRead } from "../../store/actions/notiAction";
import { Link } from 'react-router-dom'

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
    dec:{
        '&:hover': {
            textDecoration: 'none'
        },
    }
});

class notiObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.Menu,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, t, id) {
        this.setState({ value: t });
        this.props.changeMenu(t)
        this.props.checkRead(this.props.data.id)   
    }

    render() {
        const { classes, data, profile } = this.props


        return (
            <Link to={data.data.linked} className={classes.dec}><ListItem button className={classes.list} key={data.id} onClick={(event) => this.handleChange(event, data.data.linked)}>
                <ListItemIcon>
                    <img className={classes.image} alt="token" src={token} />
                </ListItemIcon>
                <ListItemText primary={data.data.content} secondary={data.data.date} />
                <Avatar name={profile.displayName} size="40" src={profile.Photo} />
            </ListItem>
            </Link>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        profile: state.firebase.profile,
        Menu: state.map.Menu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMenu: Menu => dispatch(changeMenu(Menu)),
        checkRead: Id => dispatch(checkRead(Id)),
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(notiObj))
