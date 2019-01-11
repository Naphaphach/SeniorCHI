import React, { Component } from 'react'
import { connect } from 'react-redux'
import { GridListTileBar, GridListTile, GridList, IconButton, Button, MenuItem, Paper, Grid, FormGroup, FormControlLabel, Switch, TextField } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SaveIcon from '@material-ui/icons/Save';
import { state } from '../../models/state.json'
import { Col } from 'reactstrap'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { save } from '../../store/actions/diaryAction'
import uuidv1 from 'uuid/v1'
import Typography from '@material-ui/core/Typography';

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
    },
    paper: {
        [theme.breakpoints.up('sm')]: {
            marginTop: '8.5%',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '27.5% 0',
        },
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: 'navy',
    },
    add: {
        fontSize: '2em'
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssLabel: {
        '&$cssFocused': {
            color: '#FF9933',
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: '#FF9933',
        },
    },
    cssOutlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: '#FF9933',
        },
    },
    notchedOutline: {},
    button: {
        color: '#FF9933',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    menu: {
        minWidth: 200,
    },
    input: {
        display: 'none',
    },
    im: {
        height: '100%',
        width: '100%',
        cursor: 'pointer'
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
});

class EditForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            public: false,
            text: 'Private',
            labelWidth: 0,
            imgfile: [],
            files: [],
            hide: true,
            id: '',
            title: '',
            state: '',
            note: '',
            tag: [],
            metadata: []
        };
        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
    }

    componentWillMount(){
        this.setState({id:uuidv1()});
        
    }

    getOrientation = (file, callback) => {
        var reader = new FileReader();
        reader.onload = (e) => {

            var view = new DataView(e.target.result);
            if (view.getUint16(0, false) !== 0xFFD8) {
                return callback(-2);
            }
            var length = view.byteLength, offset = 2;
            while (offset < length) {
                if (view.getUint16(offset + 2, false) <= 8) return callback(-1);
                var marker = view.getUint16(offset, false);
                offset += 2;
                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) {
                        return callback(-1);
                    }

                    var little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    var tags = view.getUint16(offset, little);
                    offset += 2;
                    for (var i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            return callback(view.getUint16(offset + (i * 12) + 8, little));
                        }
                    }
                }
                else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                }
                else {
                    offset += view.getUint16(offset, false);
                }
            }
            return callback(-1);
        };
        reader.readAsArrayBuffer(file);
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        if (event.target.checked) {
            this.setState({ text: 'Public' })
        } else {
            this.setState({ text: 'Private' })
        }
    };

    handleChangeField = name => event => {
        if (name === 'tag') {
            this.arr_diff(this.state.tag, event.target.value.split(/[ #]+/))
            this.setState({ tag: event.target.value.split(/[ #]+/) });
        } else {
            this.setState({ [name]: event.target.value });
        }
    };

    arr_diff = (A, B) => {
        const a = [], diff = [];
        for (var i = 0; i < A.length; i++) {
            a[A[i]] = true;
        }
        for (i = 0; i < B.length; i++) {
            if (a[B[i]]) {
                delete a[B[i]];
            } else {
                a[B[i]] = true;
            }
        }
        for (var k in a) {
            diff.push(k);
        }
        // console.log(diff[diff.length-1]);
    }

    handleButtonPress() {
        this.buttonPressTimer = setTimeout(() => this.setState({ hide: false }), 1500)
        clearInterval(this.timerID);
    }

    handleButtonRelease() {
        clearTimeout(this.buttonPressTimer);
        this.timerID = setInterval(() => this.setState({ hide: true }), 1500)
    }

    //display multi
    handleChangeImg(event) {
        const files = Array.from(event.target.files);
        this.getOrientation(files[0], (orientation) => {
            files.map(img =>
                this.setState(prevState => ({
                    imgfile: [...prevState.imgfile, URL.createObjectURL(img)],
                    files: [...prevState.files, img],
                    metadata: [...prevState.metadata, orientation],
                }))
            )
        });
    }

    imageClick = (im) => {
        const i = this.state.imgfile.indexOf(im)
        this.state.files.splice(i, 1)
        this.state.imgfile.splice(i, 1)
        this.setState({ files: this.state.files })
        this.setState({ imgfile: this.state.imgfile })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                    <Typography variant="subtitle1" align="center"> Add New Diary </Typography> 
                        <FormGroup row align>
                            <FormControlLabel
                                style={{ margin: 2 }}
                                control={
                                    <Switch
                                        checked={this.state.public}
                                        onChange={this.handleChange('public')}
                                        value="public"
                                        classes={{
                                            switchBase: classes.colorSwitchBase,
                                            checked: classes.colorChecked,
                                            bar: classes.colorBar,
                                        }}
                                    />
                                }
                                label={this.state.text}
                            />
                            <div className={classes.root}>
                                <GridList cellHeight={160} cols={3}>
                                    {this.state.imgfile.map(im => (
                                        <GridListTile key={im} cols={1}>
                                            <img src={im} alt={im} className={classes.im}
                                                onTouchStart={this.handleButtonPress}
                                                onTouchEnd={this.handleButtonRelease}
                                                onMouseDown={this.handleButtonPress}
                                                onMouseUp={this.handleButtonRelease} />
                                            {!this.state.hide ?
                                                <GridListTileBar
                                                    titlePosition="top"
                                                    actionIcon={
                                                        <IconButton className={classes.icon} onClick={() => this.imageClick(im)}>
                                                            <DeleteOutlineIcon />
                                                        </IconButton>
                                                    }
                                                    actionPosition="left"
                                                    className={classes.titleBar}
                                                /> : null}
                                        </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                            <p>{this.state.files[0] ? this.state.files[0].toString : null}</p>
                            <input accept="image/*" required={this.state.public} className={classes.input} onChange={this.handleChangeImg.bind(this)} id="icon-button-file" type="file" multiple />
                                <label htmlFor="icon-button-file">
                                    <IconButton className={classes.button} component="span">
                                        <PhotoCamera />
                                    </IconButton>
                            </label>
                            <TextField
                                id="outlined-full-width"
                                label="Title"
                                style={{ margin: 8 }}
                                placeholder="Title"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                className={classes.margin}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                                required={this.state.public}
                                onChange={this.handleChangeField('title')}
                            />
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="State"
                                fullWidth
                                style={{ margin: 8 }}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                                className={classes.textField}
                                value={this.state.state}
                                onChange={this.handleChangeField('state')}
                                required={this.state.public}
                                margin="normal"
                                variant="outlined"
                            >
                                {state.map((option, i) => (
                                    <MenuItem key={i} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="outlined-full-width"
                                label="Note"
                                rows="4"
                                style={{ margin: 8 }}
                                placeholder="take a note..."
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                className={classes.margin}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                                onChange={this.handleChangeField('note')}
                                required={this.state.public}
                                multiline
                            />
                            <TextField
                                id="outlined-full-width"
                                label="Tag"
                                rows="4"
                                style={{ margin: 8 }}
                                placeholder="e.g. #LocalIndiaFood #indiamarket #india #Market"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                className={classes.margin}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.cssOutlinedInput,
                                        focused: classes.cssFocused,
                                        notchedOutline: classes.notchedOutline,
                                    },
                                }}
                                onChange={this.handleChangeField('tag')}
                                required={this.state.public}
                                multiline
                            />
                            <Col xs='7'></Col>
                            <Col xs='5' align="right">
                                <Button size="small" className={classes.button} onClick={() => this.props.save(this.state)}>
                                    <SaveIcon />
                                    Save
                                </Button>
                            </Col>
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

const mapDispatchToProps = (dispatch) => {
    return {
        save: page => dispatch(save(page))
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EditForm))
