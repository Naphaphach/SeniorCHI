import React, {Component} from 'react'
import PropTypes from 'prop-types';
//import map from '../assets/map.svg';
import { withStyles } from '@material-ui/core/styles';
import {Button} from 'reactstrap'
import { connect } from 'react-redux'
import { changeState } from '../../store/actions/mapAction'

const styles = theme => ({
    state:{
        width: "100%",
        color: 'black',
        [theme.breakpoints.up('sm')]: {
            margin: '45% 0',
            width: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '20%',
            width: 'auto',
        },
    }
})

class Detail extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(s) {
        this.props.changeState(s);
    }
    render() {
        const { classes, valueState } = this.props;
        return(
            <div className={classes.state}>
                {valueState.map((s,i) => i === 0 ? <b key = {i}>{s}<br/></b> : <Button color='link' key = {i} onClick={()=>{this.handleClick(s)}}>{s}<br/></Button>)}
            </div>
        )
    }
}

Map.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
    return {
        valueState: state.map.valueState,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeState: valueState => dispatch(changeState(valueState))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Detail))