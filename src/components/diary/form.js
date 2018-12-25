import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Paper, Grid, FormGroup, FormControlLabel, Switch, TextField } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    colorSwitchBase: {
        '&$colorChecked': {
            color: '#FF9933',
            '& + $colorBar': {
                backgroundColor: '#FF9933',
            },
        },
    },
    colorBar: {},
    colorChecked: {},
    root: {
        flexGrow: 1,
        marginLeft: '64px',
        alignItems: 'flex-start !important'
    },
    rootmod: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: 'navy',
    },
    add: {
        fontSize: '2em'
    }
});

class EditForm extends Component {
    state = {
        public: false,
        text: 'private'
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        if (event.target.checked) {
            this.setState({ text: 'public' })
        } else {
            this.setState({ text: 'private' })
        }
    };
    render() {
        const { classes } = this.props
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.public}
                                        onChange={this.handleChange('public')}
                                        value="checkedA"
                                        classes={{
                                            switchBase: classes.colorSwitchBase,
                                            checked: classes.colorChecked,
                                            bar: classes.colorBar,
                                        }}
                                    />
                                }
                                label={this.state.text}
                            />
                            <TextField
                                id="outlined-full-width"
                                label="title"
                                style={{ margin: 8 }}
                                placeholder="title"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-full-width"
                                label="title"
                                style={{ margin: 8 }}
                                placeholder="title"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                            />
                        </FormGroup>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

EditForm.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default withStyles(styles)(connect(mapStateToProps)(EditForm))
