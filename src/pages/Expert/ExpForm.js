import React,{useState} from 'react';
import PropTypes from "prop-types";

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import CreateIcon from '@material-ui/icons/Create';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles,createMuiTheme,ThemeProvider, withStyles} from '@material-ui/core/styles';

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
    input:{
        color:"#fff"
    }
}));

const styles = {
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#4caf50"
          },
          "& .MuiInputLabel-outlined": {
            color: "white"
          },
          "&.MuiFormHelperText-root.Mui-error" :{
            color: "white",
          },
      background: "transperent",
      margin:"1em 0em"
    },
    main:{
        width:"100%",
        padding:"3em 1em",
        color:"#fff",
        letterSpacing:"3px"
    },
    input: {
      color: "#fff"
    },
    error:{
       color:"#fff"
    }
    
  };

const theme = createMuiTheme({
    palette: {
        primary: {
          main: "#4caf50",
        },
        secondary: {
          main: "#ffffff",
        },
        
      },
})

function ExpForm(props){
    const [title,setTitle] = useState('');
    const [desc,setDesc] = useState('');
    const [med,setMed] = useState('');
    const [lang,setLang] = useState('');
    const {classes} = props;

    const handleChange = (event) => {
        setLang(event.target.value);
    };
    const handleChangeMed = (event) =>{
        setMed(event.target.value);
    }
    return(
        <>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Grid container item direction="column" alignItems="center" justify="center" className={classes.main}>
                    <Typography variant="h4" justify="center" textAlign="center" style={{fontWeight:"600",flexGrow:1,textAlign:"center",padding:"1em 0em"}}>
                        Expert Enquiry Form
                    </Typography>
                    <form>
                        <Grid item container>
                        <TextField
                            variant="outlined"
                            label="Title"
                            color="primary"
                            style={{width:"100%"}}
                            className={classes.root}
                            InputProps={{
                                classes: {
                                    input: classes.input
                                }
                            }}
                            helperText="Give a precise title to the query."
                            FormHelperTextProps={{
                                classes:{
                                    error: classes.error
                                }
                            }}
                            onChange={(e)=>setTitle(e.target.value)}
                            ></TextField>
                            <TextField
                            variant="outlined"
                            label="Description"
                            multiline
                            color="primary"
                            style={{width:"100%"}}
                            className={classes.root}
                            InputProps={{
                                classes: {
                                    input: classes.input
                                }
                            }}
                            helperText="Give description of the query in breif."
                            onChange={(e)=>setDesc(e.target.value)}
                            ></TextField>
                            <FormControl variant="outlined" className={classes.root} style={{width:"100%",color:"#fff"}}>
                            <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
                           
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                              value={lang}
                            onChange={handleChange}
                            style={{color:"#fff"}}
                            label="Language"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"English"}>English</MenuItem>
                            <MenuItem value={"Hindi"}>Hindi</MenuItem>
                            <MenuItem value={"Marathi"}>Marathi</MenuItem>
                            </Select>
                            <FormHelperText>Select language in which assistance is needed.</FormHelperText>
                        </FormControl>
                        <FormControl variant="outlined" className={classes.root} style={{width:"100%",color:"#fff"}}>
                            <InputLabel id="demo-simple-select-outlined-label">Medium</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={med}
                            onChange={handleChangeMed}
                            style={{color:"#fff"}}
                            label="Language"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"Video Chat"}>Video Chat</MenuItem>
                            <MenuItem value={"Voice Chat"}>Voice Chat</MenuItem>
                            </Select>
                            <FormHelperText>Select a medium of communication.</FormHelperText>
                        </FormControl>
                        <Button color="primary" style={{color:"#fff",margin:"1em 0em"}} variant="contained">Submit</Button>

                        </Grid>
                    </form>
                </Grid>
            </ThemeProvider>
        </>
    );
}


ExpForm.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(ExpForm);