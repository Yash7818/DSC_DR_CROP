import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core/styles';



import NavBar from '../../components/Navbar';

const useStyles = makeStyles(()=>({
    main:{
        width:"100%",
        padding:"3em 1em",
        color:"#fff",
    },
    formControl:{
        // minWidth:300
        flexGrow:1,
        margin:"1em 0"
    },
    formele:{
        padding:"2em 1em",
        textAlign:"center"
    },
    root:{
      backgroundColor:"transperent"
    },
    input:{
        color:"#fff"
    }
}));

const theme = createMuiTheme({
    palette: {
        primary: {
          main: "#4caf50",
        },
        secondary: {
          main: "#ffffff",
        },
        
      },
      overrides: {
        MuiOutlinedInput: {
          root: {
            position: 'relative',
            '& $notchedOutline': {
              borderColor: '#2EFF22',
            },
            '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
              borderColor: '#2EFF22',
              // Reset on touch devices, it doesn't add specificity
              '@media (hover: none)': {
                borderColor: '#2EFF22',
              },
            },
            '&$focused $notchedOutline': {
              borderColor: '#2EFF22',
              borderWidth: 1,
            },
          },
        },
        MuiFormLabel: {
          root: {
            '&$focused': {
              color: '#2EFF22'
            }
          }
        }
      }
})

export default function DisForm(){
    const [open,setOpen] = useState(false);
    const [cname,setCname] = useState('');
    const classes = useStyles();

    const handleOpen = () =>{
        setOpen(true);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    const handleChange= (e) =>{
        setCname(e.target.value)
    }
    return(
        <div>
            <ThemeProvider theme={theme}>
            <NavBar></NavBar>
            <Grid container item direction="column" className={classes.main}>
            <Typography variant="h4" justify="center" textAlign="center" style={{fontWeight:"700",flexGrow:1,textAlign:"center"}}>
                Know The Disease
            </Typography>
            <form>
                <Grid container item className={classes.formele}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Crop Name</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={cname}
                        onChange={handleChange}
                        style={{width:"100%",color:"#fff"}}
                        className={classes.root}
                        InputProps={{
                          classes:{
                            className: classes.input
                          }
                        }}
                        >
                        <FormHelperText>Select the name of the infected crop</FormHelperText>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Cherry"}>Cherry</MenuItem>
                        <MenuItem value={"Strawberry"}>Strawberry</MenuItem>
                        <MenuItem value={"Potato"}>Potato</MenuItem>
                        <MenuItem value={"Tomato"}>Tomato</MenuItem>
                        <MenuItem value={"Corn"}>Corn</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container item direction="column" className={classes.formele}>
                    <Typography style={{padding:"1em 0"}} variant="h6">Upload image of infected crop</Typography>
                
                    <Button
                    variant="contained"
                    component="label"
                    color="primary"
                    style={{color:"#fff"}}
                    >
                    Upload Photo
                    <input
                        type="file"
                        hidden
                        capture
                    />
                    </Button>
                </Grid>
            </form>
            </Grid>
            </ThemeProvider>
        </div>
    );
}