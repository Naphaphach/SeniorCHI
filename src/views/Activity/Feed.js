import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { Grid } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import Post from '../../components/diary/post'
import Button from '@material-ui/core/Button';

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
      bootstrapRoot: {
        fontSize: 14,
        border: '1px solid',
        backgroundColor: '#FFA07A',
        borderColor: '#FFA07A',
        '&:hover': {
          backgroundColor: '#FF3333',
          borderColor: '#FF3333',
        },
      },
      bootstrapRoot1: {
        fontSize: 14,
        border: '1px solid',
        backgroundColor: '#FF9933',
        borderColor: '#FF9933',
        '&:hover': {
          backgroundColor: '#FF3333',
          borderColor: '#FF3333',
        },
      },
      bootstrapRoot2: {
        fontSize: 14,
        border: '1px solid',
        backgroundColor: '#FF6633',
        borderColor: '#FF6633',
        '&:hover': {
          backgroundColor: '#FF3333',
          borderColor: '#FF3333',
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
                            <Grid item xs={12} align="center">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.bootstrapRoot}
                            >
                            Location Base
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.bootstrapRoot1}
                            >
                            Theme Base
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.bootstrapRoot2}
                            >
                            Time Base
                            </Button>
                            </Grid>
                                <Post sz={12} like={true} book={true}/>
                            </Grid>
                        </div> :
                        <div className={classes.root}>
                            <Grid container spacing={24} className={classes.main}>
                            <Grid item xs={12} align='right'>
                            <Button
                                variant="contained"
                                color="primary"
                                className={(classes.margin,classes.bootstrapRoot)}
                            >
                            Location Base
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={(classes.margin,classes.bootstrapRoot1)}
                            >
                            Theme Base
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={(classes.margin,classes.bootstrapRoot2)}
                            >
                            Time Base
                            </Button>
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
