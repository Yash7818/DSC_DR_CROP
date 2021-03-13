// React imports
import React, { useState ,useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'; 
import {signin,register,googleauth} from '../../actions/userActions'
import {Link} from 'react-router-dom';
import { loginExpert, registerExpert } from '../../actions/expertActions';
import { GoogleLogin } from "react-google-login";
import config from "../../config/config";
import NavBar from '../../components/Navbar';

// Material Ui element imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Swicth from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function Home(){
    const [modal1,setModal1] = useState(false);
    const [modal2,setModal2] = useState(false);
    const [username,setUsername] = useState(null);
    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [cpassword,setCpassword] = useState(null);
    const [state,setState] = useState({
        checkedA:false,
        checkedB:false
    })
  // Default theme for material ui
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: "#4caf50",
      },
    },
  });

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const userGoogleSignin = useSelector(state=>state.userGoogleSignin);
    const {loading5,userInfo5,error5} = userGoogleSignin;
    const userRegister = useSelector(state => state.userRegister);
    const { loading2,userInfo2,error2 } = userRegister;
    const expertSignin = useSelector(state=>state.expertSignin);
    const {loading:loading3,expertInfo,error:error3} = expertSignin;
    const expertRegister = useSelector(state=>state.expertRegister);
    const {loading:loading4,expertInfo:errorInfo2,error:error4} = expertRegister;
    const dispatch = useDispatch();
    
    const handleOpen = () => {setModal1(true);}
    const handleClose = () => {setModal1(false);}
    const handleOpen1 = () => {setModal2(true);}
    const handleClose1 = () => {setModal2(false);}
    const handleSignin = () => {
        if(state.checkedB){
            dispatch(loginExpert(email,password));
        }
        else{
            console.log(email,password);
            dispatch(signin(email,password));
        }
    }
    const handleSignup = () => {
        if(state.checkedA){
            dispatch(registerExpert(username,email,password));
        }
        else{
            dispatch(register(username,email,password));
        }
        
    }
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
   
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
    useEffect(()=>{
       
        return () =>{
           
        }
    },[userInfo,userInfo5])
    return(
        <div>
            <ThemeProvider theme={theme}>
            <NavBar />
            <Modal
            open={modal1}
            onClose={handleClose}
            aria-labelledby="modal-title"
            >
                <Slide direction="down" in={modal1} mountOnEnter unmountOnExit>
                    <Grid justify="center" alignContent="center" alignItems="center" className="login" style={{position:"absolute",top:"10%",left:"30%",outline:"none",border:"none",borderRadius:"2em"}}>
                        <Grid style={{width:"100%",textAlign:"center",padding:"2em"}}>
                            <Typography variant="h3" color="secondary" style={{textAlign:"center",padding:"1em 0",fontWeight:"700"}}>
                                Log In
                            </Typography>
                            <GoogleLogin
                                clientId={config.CLIENT_ID}
                                buttonText="Login"
                                onSuccess={responseSuccessGoogle}
                                onFailure={responseErrorGoogle}
                                cookiePolicy={"single_host_origin"}
                            />
                        </Grid>
                        
                        <Grid style={{display:"flex",flexDirection:"column",padding:"2em",color:"#010101"}}>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            fullwidth
                            label="Username or Email"
                            color="secondary"
                            onChange={(e)=>{setEmail(e.target.value)}}
                            helperText={error?error:""}
                            ></TextField>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            fullwidth
                            color="secondary"
                            type="password"
                            label="Password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            ></TextField>
                           <FormControlLabel
                            control={<Swicth
                                checked={state.checkedB}
                                onChange={handleChange}
                                name="checkedB"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                               ></Swicth>}
                               label={"Log In as an Expert Advisor."}
                               style={{color:"#4caf50"}}
                            >
                            </FormControlLabel>
                            <Typography style={{padding:"1em 0"}}>
                                Don't have an account <span onClick={()=>{handleClose();handleOpen1()}} style={{color:"#4caf50",cursor:"pointer"}}>Sign Up</span> here.
                            </Typography>
                            <Button variant="outlined" onClick={handleSignin}>
                                {
                                    loading?<CircularProgress size={24} color="secondary"></CircularProgress>: <div>Log In</div>
                                }
                            </Button>
                        </Grid>
                        
                    </Grid>
                </Slide>
            </Modal>
            <Modal
            open={modal2}
            onClose={handleClose1}
            aria-labelledby="modal-title"
            >
                <Slide direction="down" in={modal2} mountOnEnter unmountOnExit>
                    <Grid justify="center" alignContent="center" alignItems="center" className="login" style={{position:"absolute",top:"6%",left:"30%",outline:"none",border:"none",borderRadius:"2em"}}>
                        <Grid>
                            <Typography variant="h3" color="secondary" style={{textAlign:"center",padding:"1em 0",fontWeight:"700"}}>
                                Sign Up
                            </Typography>
                        </Grid>
                        <Grid style={{display:"flex",flexDirection:"column",padding:"2em",color:"#010101"}}>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            fullwidth
                            label="Username"
                            color="secondary"
                            onChange={(e)=>{setUsername(e.target.value)}}
                            ></TextField>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            fullwidth
                            label="Email or mobile number"
                            color="secondary"
                            onChange={(e)=>{setEmail(e.target.value)}}
                            ></TextField>
                            <TextField
                            variant="outlined"
                            margin="normal"
                            fullwidth
                            color="secondary"
                            type="password"
                            label="Password"
                            onChange={(e)=>{setPassword(e.target.value)}}
                            ></TextField>
                             <TextField
                            variant="outlined"
                            margin="normal"
                            fullwidth
                            color="secondary"
                            type="password"
                            label="Confirm Password"
                            onClick={(e)=>{setCpassword(e.target.value)}}
                            ></TextField>
                            <FormControlLabel
                            control={<Swicth
                                checked={state.checkedA}
                                onChange={handleChange}
                                name="checkedA"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                               ></Swicth>}
                               label={"Sign Up as an Expert Advisor."}
                               style={{color:"#4caf50"}}
                            >
                            </FormControlLabel>
                            
                            <Typography style={{padding:"1em 0"}}>
                                Already have an account <span onClick={()=>{handleClose1();handleOpen();}} style={{color:"#4caf50",cursor:"pointer"}}>Log In</span> here.
                            </Typography>
                            <Button variant="outlined" onClick={handleSignup}>
                                {
                                    loading2?<CircularProgress size={24} color="secondary"></CircularProgress>:"Sign up"
                                }
                            </Button>
                        </Grid>
                        
                    </Grid>
                </Slide>
            </Modal>
            <Grid container item direction="column" style={{padding:"4em 0"}}>
                <Grid>
                    <img alt="" src="https://res.cloudinary.com/marcos-yash/image/upload/v1612933591/home_dig_wrtus2.png" style={{maxWidth:"20em"}}></img>
                </Grid>
                <Grid style={{textAlign:"center",padding:"1em"}}>
                    <Typography variant="h4" style={{fontWeight:"bold",color:"#fff",padding:"3em 0",paddingBottom:"1em"}}>
                    Find solution for your preciuos crops at your <span style={{color:"#08FF21"}}> door step</span>.
                    </Typography>
                    <Grid>
                        <Button variant="outlined" style={{color:"#fff",width:"fit-content",height:"2.5em",fontSize:"1em",fontWeight:"700",border:"2px solid #fff",borderRadius:"3em"}} >{userInfo || expertInfo ?<Link style={{textDecoration:"none",color:"#fff",fontSize:"1em"}} to="/userProfile">Go to Profile</Link>:<Link to="/login" style={{textDecoration:"none",color:"#fff"}}><div onClick={handleOpen}>Get Started</div></Link>}</Button>
                    </Grid>
                </Grid>
            </Grid>
        <Grid
          style={{
            position: "absolute",
            left: "-10em",
            top: "-10em",
            zIndex: "-1",
          }}
        >
          <img
            alt=""
            src="https://res.cloudinary.com/marcos-yash/image/upload/v1612419308/Ellipse_1_BG_m50mne.png"
            style={{ maxHeight: "65em" }}
          ></img>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default Home;
