import React, { Component, Fragment } from 'react'
import { Grid } from '@material-ui/core/'
import Location from '@material-ui/icons/LocationOn';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookedIcon from '@material-ui/icons/Bookmark';
import FavIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LoveIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ReportIcon from '@material-ui/icons/MoreVert';
import img from '../../assets/test1.jpg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    img: {
      width: 'auto',
      height: 'auto',
      margin: 'center',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    card: {
      marginTop: '5px',
      maxWidth: 400,
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    
});

class Post extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
    render() {
        const { classes, sz, like, book, love, booked} = this.props
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return(
        <Fragment className={classes.root}>
          <Grid item xs={sz}>
          <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              C
            </Avatar>
          }
          action={
            <IconButton>
              <ReportIcon onClick={this.handleClickOpen} />
            </IconButton>
          }
          title="Caption"
          subheader="Jan 14, 2019"
        />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"This content is inappropriate or incorrect."}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to report it?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Report
            </Button>
          </DialogActions>
        </Dialog>
        <img className={classes.img} alt="complex" src= {img} /> 
        <CardActions className={classes.actions} disableActionSpacing>
        {like ? 
            love ? 
                      <IconButton > <FavIcon color="secondary" /> </IconButton>
                      :<IconButton > <LoveIcon color="secondary" /> </IconButton> : null}
        {book ? 
            booked ? 
                      <IconButton > <BookmarkIcon color="disabled" /> </IconButton> 
                      : <IconButton > <BookedIcon color="disabled" /> </IconButton> : null}
        </CardActions>
        <CardContent>
          <Typography component="p" align="left"> This is a Golden temple. This is a Golden temple. This is a Golden temple.</Typography>
          <Typography variant="caption" align="right">  <Location /> Manipur </Typography> 
          <Typography variant="caption" align="right">  #Agriclture #Agriclture </Typography>  
        </CardContent>
        </Card>
          </Grid>
        </Fragment>
        )
    }
}    

export default withStyles(styles)(Post)