import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#FF9933',
        borderColor: '#FF9933',
        color: theme.palette.common.white,
        fontSize: 14,
    },
  }))(TableCell);

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    maxWidth: '100%',
  },
});

let id = 0;
function createData(title,createDate) {
  id += 1;
  return { id, title,createDate };
}

const rows = [
  createData('Title1', '19/01/2019'),
  createData('Title1', '19/01/2019'),
  createData('Title1', '19/01/2019'),
  createData('Title1', '19/01/2019'),
  createData('Title1', '19/01/2019'),
  createData('Title1', '19/01/2019'),
  createData('Title1', '19/01/2019'),
  createData('Title1', '19/01/2019'),
];

function PriPost(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
        <TableRow>
            <CustomTableCell>Title</CustomTableCell>
            <CustomTableCell align="right">Created Date</CustomTableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.createDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

PriPost.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PriPost);