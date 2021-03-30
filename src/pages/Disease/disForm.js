import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import {useDropzone} from 'react-dropzone';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import {makeStyles,createMuiTheme,ThemeProvider,withStyles} from '@material-ui/core/styles';



import NavBar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { saveCrop } from '../../actions/cropActions';
import { Redirect } from 'react-router';

const useStyles = makeStyles(()=>({
    main:{
        width:"100%",
        padding:"5em 1em",
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

const styles = {
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#4caf50",
    },
    "& .MuiInputLabel-outlined": {
      color: "white",
    },
    "&.MuiFormHelperText-root.Mui-error": {
      color: "white",
    },
    background: "transperent",
    margin: "1em 0em",
  },
  main: {
    width: "100%",
    padding: "7em 1em",
    color: "#fff",
    letterSpacing: "3px",
  },
  input: {
    color: "#fff",
  },
  error: {
    color: "#fff",
  },
  formele:{
    padding:"2em 1em",
    textAlign:"center"
  },
};

function DisForm(props){
    const [open1,setOpen1] = useState(false);
    const [cname,setCname] = useState(null);
    const [upload,setUpload] = useState(false);
    const [cha,setCha] = useState(null);
    const [dis,setDis] = useState(null);
    const [sol,setSol] = useState(null);
    const [loading,setLoad] = useState(false);
    const {classes} = props;
    const dispatch = useDispatch();

    
    const {isDragActive,getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
      noClick: true,
      noKeyboard: true,
      accept: 'image/*'
    });
    const files = acceptedFiles.map(file => (
      <Typography key={file.path} variant="h6" style={{color:"#fff"}}>
         {file.path} - {file.size} bytes
      </Typography>
     ));
    const uploadPhoto = (e) =>{
      e.preventDefault();
      setLoad(true);
      const formdata = new FormData();
      console.log(acceptedFiles[0]);
      formdata.append("file",acceptedFiles[0]);
      formdata.append("upload_preset","m6wgrt9z");
      axios.post('https://api.cloudinary.com/v1_1/marcos-yash/image/upload', formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res=>{
        console.log(res.data);
        console.log(res.data.secure_url.slice(52,res.data.secure_url.length));
        axios.get(`https://river-runner-307504.el.r.appspot.com/predict/${cname}/${res.data.secure_url.slice(52,res.data.secure_url.length)}`)
        .then(rs=>{
          console.log(rs.data); 
          const chances = Math.floor(rs.data.Chances);
          setCha(chances);
          setDis(rs.data.Status);
          setSol(rs.data.Remedy);
          dispatch(saveCrop({imgLink:res.data.secure_url,diseaseName:rs.data.Status,solution:rs.data.Remedy}));
        })
      })
    }
    const reupload = () =>{
      setUpload(false);
      acceptedFiles.pop();
    }
    const handleOpen = () =>{
        setOpen1(true);
    }
    const handleClose = () =>{
        setOpen1(false);
    }
    const handleChange= (e) =>{
        setCname(e.target.value)
    }

    useEffect(()=>{
      if(acceptedFiles.length>0){
        setUpload(true);
      }
      else{
        setUpload(false);
      }
    },[acceptedFiles,cha])
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
                    <FormControl variant="outlined" className={classes.root} style={{width:"100%",color:"#fff"}}>
                        <InputLabel id="demo-simple-select-outlined-label">Crop Name</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        open={open1}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={cname}
                        onChange={handleChange}
                        style={{color:"#fff"}}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Cherry"}>Cherry</MenuItem>
                        <MenuItem value={"Strawberry"}>Strawberry</MenuItem>
                        <MenuItem value={"Potato"}>Potato</MenuItem>
                        <MenuItem value={"Tomato"}>Tomato</MenuItem>
                        <MenuItem value={"Corn"}>Corn</MenuItem>
                        </Select>
                        <FormHelperText style={{color:"#fff"}}>Select the name of the infected crop</FormHelperText>
                    </FormControl>
                </Grid>
                <hr style={{borderColor:"#fff"}}></hr>
                <Grid container item direction="column" className={classes.formele}>
                    <Typography style={{padding:"1em 0"}} variant="h6">Upload image of infected crop</Typography>
                <Grid  {...getRootProps({className:'dropzone',isDragActive})}>
                   { !upload&&<Button
                    variant="contained"
                    component="label"
                    color="primary"
                    style={{color:"#fff"}}
                    onClick={open} y
                    
                    >
                    Upload Photo
                    <input
                       {...getInputProps()} 
                    />
                    </Button>}
                </Grid>
                {upload&&<Grid container item direction="column" style={{border:"1px solid #fff",borderRadius:"1em",padding:"1em",margin:"2em 0em"}}>
                  {files}
                  <Grid container item direction="row" alignContent="center" justify="space-around" style={{padding:"1em 0em"}}>
                  <Button onClick={uploadPhoto} variant="contained" color="primary" style={{color:"#fff"}}>
                      {loading?<CircularProgress size={24} color="secondary"></CircularProgress>:"Upload"}
                  </Button>
                  <Button onClick={reupload} variant="contained" color="primary" style={{color:"#fff"}}>
                    Re Upload
                  </Button>
                  </Grid>
                </Grid>}
                    {
                      sol&&<Redirect to={"/cropdisplay?name="+cname+"&dis="+dis+"&sol="+sol+"&chances="+cha}/>
                    }
              </Grid>
            </form>
            </Grid>
            </ThemeProvider>
        </div>
    );
}


DisForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisForm);