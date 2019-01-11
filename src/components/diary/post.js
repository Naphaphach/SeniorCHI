import React, { Component, Fragment } from 'react'
import { Paper, Grid } from '@material-ui/core/'
import Location from '@material-ui/icons/LocationOn';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookedIcon from '@material-ui/icons/Bookmark';
import DesIcon from '@material-ui/icons/Description';
import LabelIcon from '@material-ui/icons/LabelImportant';
import FavIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LoveIcon from '@material-ui/icons/Favorite';
import UserIcon from '@material-ui/icons/Person';
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
        const { classes, sz, like, book, love, booked} = this.props
        return(
        <Fragment className={classes.root}>
          <Grid item xs={sz}>
              <Paper className={classes.paper}>
                  <Typography variant="overline" > Title </Typography>
                  <img className={classes.img} alt="complex" src= {img} /> 
                  <Grid xs={12} align="right">
                  <Typography >
                  {like ? 
                    love ? 
                      <ButtonBase > <FavIcon color="secondary" /> </ButtonBase>
                      :<ButtonBase > <LoveIcon color="secondary" /> </ButtonBase> : null}
                  {book ? 
                    booked ? 
                      <ButtonBase > <BookmarkIcon color="disabled" /> </ButtonBase> 
                      : <ButtonBase > <BookedIcon color="disabled" /> </ButtonBase>
                      : null}
                  </Typography>
                  </Grid>
                  <Grid xs={12} >
                  <Typography variant="caption" align="left">  <Location /> Manipur </Typography> 
                  <Typography variant="caption" align="left"> <DesIcon /> This is a paragraph of Goldentemple</Typography> 
                  <Typography variant="caption" align="left"> <LabelIcon /> #Agriclture #Agriclture </Typography>                
                  <Typography variant="caption" align="left"> <UserIcon /> MURILCA at 22.55 p.m. </Typography>
                  </Grid>
                  </Paper>
            </Grid>
        </Fragment>
        )
    }
}    

export default withStyles(styles)(Post)