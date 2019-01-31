import React, { Component } from 'react';
import $ from 'jquery';
import { withStyles } from '@material-ui/core/styles';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar/dist/fullcalendar.js';

const styles = theme => ({
  App: {
    backgroundColor: '#ebebeb',
    color: '#000000',
  }
  
});
class Calendar extends Component {

  componentDidMount(){
    const { calendar } = this.refs;

    $(calendar).fullCalendar({
      events: [
        {
          title: 'All Day Event',
          start: '2019-02-05',
          color: '#FF9933'
        },
        {
          title: 'Long Event',
          start: '2019-01-01',
          color: '#FF9933'
        }
      ],
      eventClick: function(event) {
        alert('Event: ' + event.title);
      }
    });
    
  }

  render() {
    return (
      <div ref='calendar'></div>
    );
  }

}


class PriPost extends Component {
 
  render() {
    const { classes } = this.props
    

    return (
      <div className={classes.App}>
        <Calendar 
        id = "your-custom-ID"
        header = {{
           left: 'prev,next today myCustomButton',
           center: 'title',
           right: 'month,basicWeek,basicDay'
       }}
       navLinks= {true} // can click day/week names to navigate views
       editable= {true}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PriPost);