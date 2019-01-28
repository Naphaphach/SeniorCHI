import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { withStyles } from '@material-ui/core/styles';
import NotiObj from '../../components/notify/notificationObj'
import { isMobile } from 'react-device-detect'
import {initial} from '../../store/actions/notiAction'

const styles = theme => ({
  root: {
    width: '70%',
    backgroundColor: theme.palette.background.paper,

  },
  mobileroot: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});
class Notice extends Component {
  componentDidMount(){
    console.log(1);
    initial()
  }

  render() {
    const { classes } = this.props
    
    return (
      <Home>
        {this.props.auth.uid ?
          isMobile ?
            <div className={classes.root}>
              <NotiObj />
            </div>
            : <div className={classes.mobileroot}>
              <NotiObj />
            </div>
          : <Unregist name='Notice' />}
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
      initial: () => dispatch(initial())
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Notice))
