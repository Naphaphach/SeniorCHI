import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../layouts/Home'
import Unregist from '../../components/main/unregist'
import { Paper, Grid } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from "react-device-detect";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import { changeMenu } from "../../store/actions/mapAction";

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginLeft: '64px',
        alignItems: 'flex-start !important'
    },
    rootmod: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: 'navy',
    },
    add: {
        fontSize: '2em'
    }
});

class Diary extends Component {
    render() {
        const { classes } = this.props
        return (
            <Home>
                {this.props.auth.uid ?
                    isMobile ?
                        <div className={classes.rootmod}>
                            <Grid container spacing={16}>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>
                                        <Link to='/diary/edit'>
                                            <Tooltip title="Add" aria-label="Add" onClick={() => { this.props.changeMenu("/diary/edit"); }}>
                                                <Fab color="primary" className={classes.fab}>
                                                    <AddIcon />
                                                </Fab>
                                            </Tooltip>
                                        </Link>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper className={classes.paper}>xs=6</Paper>
                                </Grid>
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24}>
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}>
                                        <Link to='/diary/edit'>
                                            <Tooltip title="Add" aria-label="Add" onClick={() => { this.props.changeMenu("/diary/edit"); }}>
                                                <Fab color="primary" className={classes.fab}>
                                                    <AddIcon />
                                                </Fab>
                                            </Tooltip>
                                        </Link>
                                    </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                    <Paper className={classes.paper}>xs=4</Paper>
                                </Grid>
                            </Grid>
                        </div>
                    : <Unregist name='Diary' />}
            </Home>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMenu: Menu => dispatch(changeMenu(Menu))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Diary))
