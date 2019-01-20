import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { Grid, Fab } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Portrait';
import LocIcon from '@material-ui/icons/WhereToVote';
import EventIcon from '@material-ui/icons/Event';
import ArtIcon from '@material-ui/icons/Collections';
import ConsumeIcon from '@material-ui/icons/LocalDining';
import Tooltip from '@material-ui/core/Tooltip';
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
        margin: theme.spacing.unit * 2,
        backgroundColor: '#FF9933',
        borderColor: '#FF9933',
        '&:hover': {
            backgroundColor: '#FF6633',
            borderColor: '#FF6633',
        },
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
                            <Tooltip title="Person" aria-label="Person">
                                <Fab color="secondary" size="small" className={classes.fab}> <PersonIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Location" aria-label="Location">
                                <Fab color="secondary" size="small" className={classes.fab}> <LocIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Event" aria-label="Event">
                                <Fab color="secondary" size="small" className={classes.fab}> <EventIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Art" aria-label="Art">
                                <Fab color="secondary" size="small" className={classes.fab}> <ArtIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Consume_Good" aria-label="Consume_Good">
                                <Fab color="secondary" size="small" className={classes.fab}> <ConsumeIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Organization" aria-label="Add">
                                <Fab color="secondary" size="small" className={classes.fab}> <PersonIcon /> </Fab>
                            </Tooltip>
                            </Grid>
                                <Post sz={12} like={true} book={true}/>
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24} className={classes.main}>
                            <Grid item xs={12} align='center'>
                            <Tooltip title="Person" aria-label="Person">
                                <Fab color="secondary" size="big" className={classes.fab}> <PersonIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Location" aria-label="Location">
                                <Fab color="secondary" size="big" className={classes.fab}> <LocIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Event" aria-label="Event">
                                <Fab color="secondary" size="big" className={classes.fab}> <EventIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Art" aria-label="Art">
                                <Fab color="secondary" size="big" className={classes.fab}> <ArtIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Consume_Good" aria-label="Consume_Good">
                                <Fab color="secondary" size="big" className={classes.fab}> <ConsumeIcon /> </Fab>
                            </Tooltip>
                            <Tooltip title="Add" aria-label="Add">
                                <Fab color="secondary" size="big" className={classes.fab}> <PersonIcon /> </Fab>
                            </Tooltip>
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
