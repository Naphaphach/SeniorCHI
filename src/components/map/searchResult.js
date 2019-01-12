import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types';
//import map from '../assets/map.svg';
import { withStyles } from '@material-ui/core/styles';
import {Button} from 'reactstrap'
import { connect } from 'react-redux'
import { changeState } from '../../store/actions/mapAction'
import { scroller } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = theme => ({
    state:{
        width: "100%",
        color: 'black',
        textAlign: 'left',
        [theme.breakpoints.up('sm')]: {
            marginTop: '9%',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '20%',
        },
    }
})

class Result extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        scroller.scrollTo('section_map', {
            duration: 1000,
            delay: 100,
            smooth: true,
            offset: 0, // Scrolls to element + 50 pixels down the page
        })
    }

    handleClick() {
        scroller.scrollTo('section_detail', {
            duration: 1000,
            delay: 100,
            smooth: true,
            offset: 0, // Scrolls to element + 50 pixels down the page
        })
    }
    render() {
        const { classes, valueState, search, Query} = this.props;
        return(
            <Fragment>
                {search ? <div className={classes.state}>
                    Search: '{Query}' with {valueState[0] === '' ? 0 : valueState.length} Result(s) <Button color='link' onClick={()=>{this.handleClick()}}><FontAwesomeIcon icon={['fas', 'arrow-right']} /><br/></Button>
                </div> : null}
            </Fragment>
        )
    }
}

Result.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return {
        valueState: state.map.valueState,
        search: state.map.search,
        Query: state.map.Query,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeState: valueState => dispatch(changeState(valueState))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Result))