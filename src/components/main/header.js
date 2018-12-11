import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import {Icon, Drawer, MenuItem, Menu, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, InputBase, Button} from '@material-ui/core';
import {Menu as MenuIcon, ChevronLeft as ChevronLeftIcon,ChevronRight as ChevronRightIcon, Search as SearchIcon} from '@material-ui/icons';
import logo from '../../assets/logo.png'
import { Link, Redirect } from 'react-router-dom'
import { searchMap } from '../../store/actions/mapAction'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Co from '../../components/main/cooperate'
import Avatar from 'react-avatar'
import {signout} from '../../store/actions/authAction'
import { changeMenu } from "../../store/actions/mapAction";
import {isMobile, isTablet} from "react-device-detect";

const drawerWidth = 240;

const styles = theme => ({
  but:{
    marginRight: 12,
  },
  root: {
    display: 'flex',
  },
  logo:{
    width: '2.5rem',
    marginRight: 12,
    marginLeft: 12,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'yellowgreen',
    '&:hover': {
      backgroundColor: 'olivedrab'
    },
    marginRight: theme.spacing.unit * 2,
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'rgb(162,224,120)'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 8 ,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  icon: {
    fontSize: '0.45em',
    width: 'auto',
    height: 'auto',
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      search: this.props.valueSearch,
      anchorEl: null,
      value: this.props.Menu,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, t) {
    this.setState({value: t});
    this.props.changeMenu(t)
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChangeSearch = event => {
    this.props.searchMap(event.target.value)
  };

  handleclick = () => {
    this.props.signout();
    this.setState({ anchorEl: null });
  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfile = (value) => {
    this.setState({ anchorEl: null });
    this.setState({value});
    this.props.changeMenu(value)
  }

  renderRedirect = (value) => {
    if (value !== window.location.pathname) {
        return <Redirect to={value} />   
    }
  }

  render() {
    const { classes, theme, valueSearch, profile } = this.props;
    const { anchorEl, value } = this.state;
    const isMenuOpen = Boolean(anchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={() => this.handleProfile('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() =>  this.handleProfile('/Privacy')}>Privacy Policy</MenuItem>
        <MenuItem onClick={() =>  this.handleProfile('/Terms')}>Terms of Service</MenuItem>
        <MenuItem onClick={this.handleclick}>Sign Out</MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
          {!isTablet && !isMobile && window.location.pathname.search('in') === -1 && window.location.pathname.search('up') === -1 && this.props.auth.uid ?
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
            {this.renderRedirect(value)}
               <MenuIcon /> 
            </IconButton>
             : null} 
            <Typography variant="h6" color="inherit">
                <Link to="/" onClick={() => this.props.changeMenu("/")}><img src={logo} alt='CHI' className={classes.logo}/></Link>
            </Typography>
            {window.location.pathname.search('in') === -1 && window.location.pathname.search('up') === -1 && window.location.pathname.search('profile') === -1 ? 
            <Fragment>
              <div className={classes.search} style={{width: '100%', marginLeft: 0}}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                            }}
                            value={valueSearch}
                            onChange={this.handleChangeSearch}
                        />
                    </div>
                    {this.props.auth.uid ?
                    <IconButton
                      aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleProfileMenuOpen}
                      color="inherit"
                      className={classes.but}
                    >
                      <Avatar name={profile.displayName} size="45" src={profile.Photo} round={true}/>
                      </IconButton>
                    : <Button color="inherit" className={classes.but}><Link to="/upin" style={{
                      fontWeight: "bold",
                      color: "white"
                    }}> Login </Link> </Button>}
            </Fragment>
            :null}
          </Toolbar>
        </AppBar>
        {!isTablet && !isMobile && window.location.pathname.search('in') === -1 && window.location.pathname.search('up') === -1 && this.props.auth.uid ?
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['/', '/diary', '/feed', '/bookmark', '/notice'].map((text, index) => (
              <ListItem button key={text} selected={this.props.Menu === text} onClick={(event) => this.handleChange(event, text)}>
                <ListItemIcon>
                {index === 0 ? 
                <FontAwesomeIcon icon={['fas', 'map-marked-alt']} /> : 
                index === 1 ? 
                <FontAwesomeIcon icon={['fas', 'file-signature']} /> : 
                index === 2 ? 
                <FontAwesomeIcon icon={['fas', 'newspaper']} /> : 
                index === 3 ? 
                <FontAwesomeIcon icon={['fas', 'bookmark']} /> :
                <FontAwesomeIcon icon={['fas', 'bell']} />}
                </ListItemIcon>
                {index === 0 ? <ListItemText primary={'map'} />: <ListItemText primary={text.replace('/','  ')} />}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['/Privacy', '/Terms'].map((text, index) => (
              <ListItem button key={text} selected={this.props.Menu === text} onClick={(event) => this.handleChange(event, text)}>
                <ListItemIcon>
                {index === 0 ? 
                <Icon className={classes.icon}>Privacy</Icon> : 
                <Icon className={classes.icon}>Terms</Icon>
                }
                </ListItemIcon>
                {index === 0 ? <ListItemText primary={'Privacy Policy'} />: <ListItemText primary={'Terms of Service'} />}
              </ListItem>
            ))}
          </List>
          <Co/>
        </Drawer>
         :null}
         {renderMenu}  
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  valueSearch: PropTypes.string
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
      valueSearch: state.map.valueSearch,
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      Menu: state.map.Menu,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      searchMap: valueSearch => dispatch(searchMap(valueSearch)),
      signout: () => dispatch(signout()),
      changeMenu: Menu => dispatch(changeMenu(Menu))
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Header));