import React, { Component } from 'react'
import Home from '../../layouts/Home'
import { connect } from 'react-redux'
import Unregist from '../../components/main/unregist'
import { Grid } from '@material-ui/core/'
import { isMobile } from "react-device-detect";
import { withStyles } from '@material-ui/core/styles';
import img from '../../assets/test1.jpg';
import ButtonBase from '@material-ui/core/ButtonBase';
const styles = theme => ({
  root: {
      marginTop: '10%',
      flexGrow: 1,
      marginLeft: '64px',
      alignItems: 'flex-start !important',
  },
  rootmod: {
    marginTop: '10%',
      flexGrow: 1,
  },
  grid: {
    width: '30%',
    height: 'auto',
    paddingRight: '10px'
  },
  button: {
    width: 'auto',
    height: 'auto',
  },
  img: {
    width: '100%',
    height: '100%',

  },
});

   
class Book extends Component {
  render() {
    const { classes } = this.props
    return (
        <Home>
            {this.props.auth.uid ?
                isMobile ?
                <div className={classes.rootmod}>
                        <Grid container spacing={16} className={classes.main}>
                          <Grid item className={classes.grid}> 
                            <img className={classes.img} alt="complex" src= {img} /> 
                          </Grid>
                        </Grid>
                    </div> :
                    <div className={classes.root}>
                        <Grid container spacing={24} className={classes.main}>
                        <Grid item className={classes.grid}>
                          <ButtonBase className={classes.button} >
                            <img className={classes.img} alt="complex" src= {img} />  
                          </ButtonBase>
                        </Grid>
                        <Grid item className={classes.grid}>
                          <ButtonBase className={classes.button} >
                            <img className={classes.img} alt="complex" src= {img} />  
                          </ButtonBase>
                        </Grid>
                        </Grid>
                    </div>
                : <Unregist name='Book' />}
        </Home>
    )
}
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Book))
