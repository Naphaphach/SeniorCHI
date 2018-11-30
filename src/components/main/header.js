import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../assets/logo.png'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
    logo:{
        width: '2.5rem',
    },
    root:{
        backgroundColor: 'rgb(162,224,120)'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'yellowgreen',
        '&:hover': {
          backgroundColor: 'olivedrab'
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: '5%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing.unit * 3,
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
        width: '100%',
      },
      inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
})

class Header extends Component {
    render() {
        const { classes } = this.props;
        return(
            <Fragment >
                <AppBar position="fixed" className={classes.root}>
                    <Toolbar>
                    <Typography variant="h6" color="inherit">
                        <img src={logo} alt='CHI' className={classes.logo}/>
                    </Typography>
                    <div className={classes.search} style={{width: '100%'}}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                        />
                    </div>
                    </Toolbar>
                </AppBar>
            </Fragment>
        )
    }    
}

Map.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header)

