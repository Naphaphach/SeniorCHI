import React, { Component, Fragment } from 'react'
import { Grid, Card, CardHeader, CardContent, CardActions, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core'
import Location from '@material-ui/icons/LocationOn';
import BookmarkIcon from '@material-ui/icons/BookmarkBorderOutlined';
import BookedIcon from '@material-ui/icons/Bookmark';
import FavIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LoveIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core/styles';
import ReportIcon from '@material-ui/icons/MoreVert';
import { connect } from 'react-redux'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';
import Avatar from 'react-avatar'
import { like, book } from "../../store/actions/mapAction";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '10%'
  },
  img: {
    margin: 'center',
    display: 'block',
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
});

class PubPost extends Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, open: false, };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.post.data.photo.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.post.data.photo.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  like(id, uid){
    this.props.like(id, uid)
  }

  book(id, uid){
    this.props.book(id, uid)
  }

  render() {
    const { activeIndex } = this.state;
    const { classes, sz, post, auth } = this.props

    const slides = post.data.photo.map((item, i) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={i}
        >
          <img src={item} key={i} alt={item} style={{ width: '100%' }} />
        </CarouselItem>
      );
    });
    return (
      <Grid item xs={sz} className={classes.root} key={post.id}>
        <Card className={classes.card} >
          <CardHeader
            avatar={
              <Avatar name={post.writer.displayName} size="45" src={post.writer.Photo} round={true} />
            }
            action={
              <IconButton>
                <ReportIcon onClick={this.handleClickOpen} />
              </IconButton>
            }
            title={post.data.title}
            subheader={post.data.date}
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
          <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous}>
            <CarouselIndicators key={post.id} items={post.data.photo} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
          </Carousel>
          <CardActions className={classes.actions} disableActionSpacing>
            {auth.uid ?
              <Fragment>
                <IconButton onClick={() => {this.like(post.id, auth.uid)}}>
                  {post.data.like ? post.data.like.includes(auth.uid) ? <LoveIcon color="secondary" /> : <FavIcon color="secondary" /> : <FavIcon color="secondary" />}
                </IconButton>
                <IconButton onClick={() => {this.book(post.id, auth.uid)}}>
                  {post.data.book ? post.data.book.includes(auth.uid) ? <BookedIcon color="disabled" /> : <BookmarkIcon color="disabled" /> : <BookmarkIcon color="disabled" />}
                </IconButton>
              </Fragment> : null}
          </CardActions>
          <CardContent>
            <Typography component="p" align="left">{post.data.note}</Typography>
            <Typography variant="caption" align="right">  <Location /> {post.data.state} </Typography>
            <Typography variant="caption" align="right">  {post.data.tag.map(tag => ' #' + tag)} </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    valueState: state.map.valueState,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      like: (id, uid) => dispatch(like(id, uid)),
      book: (id, uid) => dispatch(book(id, uid)),
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PubPost))