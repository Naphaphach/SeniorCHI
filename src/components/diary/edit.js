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

class Edit extends Component {
    render() {
        const { classes } = this.props
        return (
            <Home>
                {this.props.auth.uid ?
                    isMobile ?
                        <div className={classes.rootmod}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        1
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={0}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        1
                                    </Paper>
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

export default withStyles(styles)(connect(mapStateToProps)(Edit))
