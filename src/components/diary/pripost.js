import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';

const styles = theme => ({
  root: {
    width: '100%',
  },
  table: {
    maxWidth: '100%',
  },
});


class PriPost extends Component {
  state = {
    date: new Date(),
  }
  onChange = date => this.setState({ date })
 
  render() {
    const { classes } = this.props
    return (
      <div >
        <Calendar
          className={classes.root}
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
  );
}
}

PriPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PriPost);