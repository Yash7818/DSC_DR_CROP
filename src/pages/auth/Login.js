import React,{useState} from 'react';
import PropTypes from "prop-types";
import config from "../../config/config";
import { GoogleLogin } from "react-google-login";


import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import CreateIcon from '@material-ui/icons/Create';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';
import {makeStyles,createMuiTheme,ThemeProvider, withStyles} from '@material-ui/core/styles';

import NavBar from '../../components/Navbar';
import { Link,Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { googleauth, register, signin } from '../../actions/userActions';

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

function LogIn(props){
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState({
        password:'',
        showPassword:false
    })
    const dispatch = useDispatch();
    const {classes} = props;
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const handleClickShowPassword = () => {
        setPass({ ...pass, showPassword: !pass.showPassword });
      };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignin = () =>{
        dispatch(signin(email,pass.password));
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
                        Log In
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
                            label="Email or Username"
                            color="primary"
                            style={{width:"100%"}}
                            className={classes.root}
                            InputProps={{
                                classes: {
                                    input: classes.input
                                }
                            }}
                            helperText="Email which was used to register."
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

                            <Typography style={{padding:"2em 0 1em 0"}}>
                                Don't have an account? <Link to="/signup" style={{color:"#4caf50",cursor:"pointer",textDecoration:"none"}}>Sign Up</Link> here.
                            </Typography>
                        <Button color="primary" style={{color:"#fff",margin:"1em 0em",width:"100%",textAlign:"center"}} variant="contained" onClick={handleSignin}>
                            {
                                loading?<CircularProgress size={24} color="secondary"></CircularProgress>: <div>Log In</div>
                            }
                            {
                                 userInfo&&<Redirect to="/"></Redirect>
                            }
                        </Button>

                        </Grid>
                    </form>
                </Grid>
            </ThemeProvider>
        </>
    );
}


LogIn.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(styles)(LogIn);