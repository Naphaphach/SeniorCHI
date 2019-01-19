import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from '../../layouts/Home'
import Unregist from '../../components/main/unregist'
import { Grid, Fab, Tooltip } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { changeMenu } from "../../store/actions/mapAction";
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
    add: {
        fontSize: '2em'
    },

    main: {
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
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },

});

class Diary extends Component {
    render() {
        const { classes } = this.props
        return (
            <Home>
                {this.props.auth.uid ?
                    isMobile ?
                        <div className={classes.rootmod}>
                            <Grid container spacing={16} className={classes.main}>
                            <Grid item xs={12} align='right'>
                                            <Link to='/diary/edit'>
                                                <Tooltip title="Add" aria-label="Add" onClick={() => { this.props.changeMenu("/diary/edit"); }}>
                                                    <Fab size="small" color="primary" align="right" className={classes.fab}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </Link>
                                        <Fab size="small" color="secondary" align="right" aria-label="Edit" className={classes.fab}>
                                            <EditIcon />
                                        </Fab>
                                        <Fab size="small" color="extended" align="right" aria-label="Delete" className={classes.fab}>
                                            <DeleteIcon />
                                        </Fab>
                                        </Grid>
                                <Post sz={12} like={false} book={false} report={false}/>
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24} className={classes.main}>
                                        <Grid item xs={12} align='right'>
                                            <Link to='/diary/edit'>
                                                <Tooltip title="Add" aria-label="Add" onClick={() => { this.props.changeMenu("/diary/edit"); }}>
                                                    <Fab size="big" color="primary" align="right" className={classes.fab}>
                                                        <AddIcon />
                                                    </Fab>
                                                </Tooltip>
                                            </Link>
                                        <Fab size="big" color="secondary" align="right" aria-label="Edit" className={classes.fab}>
                                            <EditIcon />
                                        </Fab>
                                        <Fab size="big" color="extended" align="right" aria-label="Delete" className={classes.fab}>
                                            <DeleteIcon />
                                        </Fab>
                                        </Grid>
                                    <Post sz={4} like={false} book={false} report={false}/>
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
