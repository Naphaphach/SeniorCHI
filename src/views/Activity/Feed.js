import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { Grid, Fab } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import LocIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import ArtIcon from '@material-ui/icons/ArtTrack';


import Post from '../../components/diary/post'

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '64px',
        alignItems: 'flex-start !important',
    },
    rootmod: {
        flexGrow: 1,
    },
    main:{
        [theme.breakpoints.up('sm')]: {
            marginTop: '8.5%',
            marginBottom: '2.5%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
            marginBottom: '20%',
        },
    },
    fab: {
        marginRight: theme.spacing.unit,
    },
    fab1: {
        marginRight: '50px',
    },

});

class Feed extends Component {
    
    render() {
        const { classes } = this.props
        return (
            <Home>
                {this.props.auth.uid ?
                    isMobile ?
                    <div className={classes.rootmod}>
                            <Grid container spacing={16} className={classes.main}>
                            <Grid item xs={12} align='center'>
                            <Fab size="small" color="secondary" align="right" aria-label="Edit" className={classes.fab}>
                                <PersonIcon />
                            </Fab>
                            <Fab size="small" color="secondary" align="right" aria-label="Edit" className={classes.fab}>
                                <LocIcon />
                            </Fab>
                            <Fab size="small" color="secondary" align="right" aria-label="Edit" className={classes.fab}>
                                <ArtIcon />
                            </Fab>
                            <Fab size="small" color="secondary" align="right" aria-label="Edit" className={classes.fab}>
                                <EventIcon />
                            </Fab>
                            <Fab size="small" color="secondary" align="right" aria-label="Edit" className={classes.fab}>
                                <PersonIcon />
                            </Fab>
                            <Fab size="small" color="secondary" align="right" aria-label="Edit" className={classes.fab}>
                                <PersonIcon />
                            </Fab>
                            </Grid>
                                <Post sz={12} like={true} book={true}/>
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24} className={classes.main}>
                            <Grid item xs={12} align='center'>
                            <Fab size="big" color="secondary" align="right" aria-label="Edit" className={classes.fab1}>
                                <PersonIcon />
                            </Fab>
                            <Fab size="big" color="secondary" align="right" aria-label="Edit" className={classes.fab1}>
                                <LocIcon />
                            </Fab>
                            <Fab size="big" color="secondary" align="right" aria-label="Edit" className={classes.fab1}>
                                <ArtIcon />
                            </Fab>
                            <Fab size="big" color="secondary" align="right" aria-label="Edit" className={classes.fab1}>
                                <EventIcon />
                            </Fab>
                            <Fab size="big" color="secondary" align="right" aria-label="Edit" className={classes.fab1}>
                                <PersonIcon />
                            </Fab>
                            <Fab size="big" color="secondary" align="right" aria-label="Edit" className={classes.fab1}>
                                <PersonIcon />
                            </Fab>
                            </Grid>
                                <Post sz={4} like={true} book={true}/>
                            </Grid>
                        </div>
                    : <Unregist name='Feed' />}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}


export default withStyles(styles)(connect(mapStateToProps)(Feed))
