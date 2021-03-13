import React,{useState} from 'react';
import PropTypes from "prop-types";
import config from "../../config/config";
import { GoogleLogin } from "react-google-login";


import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles,createMuiTheme,ThemeProvider, withStyles} from '@material-ui/core/styles';

import NavBar from '../../components/Navbar';
import { Link,Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleauth, register } from '../../actions/userActions';

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

function SignUp(props){
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [cpass,setCpass] = useState('');
    const [pass,setPass] = useState({
        password:'',
        showPassword:false
    });
    const dispatch = useDispatch();
    const {classes} = props;
    const userRegister = useSelector(state => state.userRegister);
    const { loading2,userInfo2,error2 } = userRegister;

    const handleClickShowPassword = () => {
        setPass({ ...pass, showPassword: !pass.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const handleSignup = () =>{
        dispatch(register(username,email,pass.password))
    }
    const responseSuccessGoogle = (response) => {
        console.log(response);
        dispatch(googleauth(response.tokenId));
        // axios({
        //   method: "POST",
        //   url: "/api/users/googlelogin",
        //   data: { tokenId: response.tokenId },
        // }).then((result) => {
        //   console.log("Google Login Success", result);
        //   Cookie.set("userInfo", JSON.parse(JSON.stringify(result)));
        // });
      };
      const responseErrorGoogle = (response) => {
        console.log(response);
      };
   
    return(
        <>
            <ThemeProvider theme={theme}>
                <NavBar />
                <Grid container item direction="column" alignItems="center" justify="center" className={classes.main}>
                    <Typography variant="h4" justify="center" textAlign="center" style={{fontWeight:"600",flexGrow:1,textAlign:"center",padding:"1em 0em"}}>
                        Sign Up
                    </Typography>
                    <GoogleLogin
                                clientId={config.CLIENT_ID}
                                buttonText="Login"
                                onSuccess={responseSuccessGoogle}
                                onFailure={responseErrorGoogle}
                                cookiePolicy={"single_host_origin"}
                                style={{width:"100%"}}
                    />
                    <form>
                        <Grid item container>
                        <TextField
                            variant="outlined"
                            label="Username"
                            color="primary"
                            style={{width:"100%"}}
                            className={classes.root}
                            InputProps={{
                                classes: {
                                    input: classes.input
                                }
                            }}
                            helperText="Choose some intresting username."
                            FormHelperTextProps={{
                                classes:{
                                    error: classes.error
                                }
                            }}
                            onChange={(e)=>setUsername(e.target.value)}
                            ></TextField>
                            <TextField
                            variant="outlined"
                            label="Email"
                            color="primary"
                            style={{width:"100%"}}
                            className={classes.root}
                            InputProps={{
                                classes: {
                                    input: classes.input
                                }
                            }}
                            FormHelperTextProps={{
                                classes:{
                                    error: classes.error
                                }
                            }}
                            onChange={(e)=>setEmail(e.target.value)}
                            ></TextField>
                            <TextField
                            variant="outlined"
                            label="Password"
                            type="password"
                            color="primary"
                            style={{width:"100%"}}
                            className={classes.root}
                            InputProps={{
                                classes: {
                                    input: classes.input
                                }
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {pass.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              }
                            onChange={(e)=>setPass({password:e.target.value})}
                            ></TextField>
                            <TextField
                            variant="outlined"
                            label="Confirm Password"
                            type="password"
                            color="primary"
                            style={{width:"100%"}}
                            helperText={pass.password===cpass?"":"Password didn't match"}
                            className={classes.root}
                            InputProps={{
                                classes: {
                                    input: classes.input
                                }
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {pass.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              }
                            onChange={(e)=>setCpass(e.target.value)}
                            ></TextField>
                            <Typography style={{padding:"2em 0 1em 0"}}>
                                Already have an account? <Link to="/login" style={{color:"#4caf50",cursor:"pointer",textDecoration:"none"}}>Log In</Link> here.
                            </Typography>
                        <Button color="primary" style={{color:"#fff",margin:"1em 0em",width:"100%"}} variant="contained" onClick={handleSignup}>
                            {
                                    loading2?<CircularProgress size={24} color="secondary"></CircularProgress>:"Sign up"
                            }
                            {
                                userInfo2&&<Redirect to="/login"></Redirect>
                            }
                        </Button>

                        </Grid>
                    </form>
                </Grid>
            </ThemeProvider>
        </>
    );
}


SignUp.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(SignUp);