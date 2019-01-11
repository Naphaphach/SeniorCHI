import React, { Component, Fragment } from 'react'
import { Paper, Grid } from '@material-ui/core/'
import Location from '@material-ui/icons/LocationOn';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import DesIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/LabelImportant';
import FavIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import img from './test1.jpg';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginTop: '5px',
      
    },
    img: {
      width: 'auto',
      height: 'auto',
      margin: 'center',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    
});

class Post extends Component {
    render() {
        const { classes, sz} = this.props
        return(
        <Fragment className={classes.root}>
          <Grid item xs={sz}>
              <Paper className={classes.paper}>
                  <Typography variant="overline" > Title </Typography>
                  <img className={classes.img} alt="complex" src= {img} /> 
                  <Typography align="right" color="secondary" >
                  <ButtonBase > <FavIcon /> </ButtonBase>
                  <ButtonBase > <BookmarkIcon color="disabled" /> </ButtonBase>
                  </Typography>
                  <Typography variant="caption" align="left">  <Location /> Manipur </Typography> 
                  <Typography variant="caption" align="left"> <DesIcon /> This is a paragraph of Goldentemple</Typography> 
                  <Typography variant="caption" align="left"> <LabelIcon /> #Agriclture #Agriclture </Typography>                
                  <Typography variant="caption" align="right"> By MURILCA at 22.55 p.m. </Typography>
                  </Paper>
            </Grid>
        </Fragment>
        )
    }
}    

export default withStyles(styles)(Post)