// React imports
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux'; 
import {Link} from 'react-router-dom';
import NavBar from '../../components/Navbar';

// Material Ui element imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


function Home(){
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

    const expertSignin = useSelector(state=>state.expertSignin);
    const {loading3,expertInfo,error3} = expertSignin;
   
    useEffect(()=>{
        return () =>{
           
        }
    },[userInfo,expertInfo])
    return(
      <>
        <div>
            <ThemeProvider theme={theme}>
            <NavBar />
            <Grid container item direction="column" style={{padding:"4em 0"}}>
                <Grid>
                    <img alt="" src="https://res.cloudinary.com/marcos-yash/image/upload/v1612933591/home_dig_wrtus2.png" style={{maxWidth:"20em"}}></img>
                </Grid>
                <Grid style={{textAlign:"center",padding:"1em"}}>
                    <Typography variant="h4" style={{fontWeight:"bold",color:"#fff",padding:"3em 0",paddingBottom:"1em"}}>
                    Find solution for your preciuos crops at your <span style={{color:"#08FF21"}}> door step</span>.
                    </Typography>
                    <Grid>
                        <Button variant="outlined" style={{color:"#fff",width:"fit-content",height:"2.5em",fontSize:"1em",fontWeight:"700",border:"2px solid #fff",borderRadius:"3em"}} >
                            {
                            userInfo&&<Link style={{textDecoration:"none",color:"#fff",fontSize:"1em"}} to="/userProfile">
                                Go to Profile</Link>
                            }
                            {
                               expertInfo &&<Link style={{textDecoration:"none",color:"#fff",fontSize:"1em"}} to="/expertProfile">
                               Go to Profile</Link>
                            }
                            {
                              !userInfo && !expertInfo && 
                              <Link to="/login" style={{textDecoration:"none",color:"#fff"}}>
                                    <div>Get Started</div>
                              </Link>
                            }
                            {
                                loading||loading3 &&<CircularProgress size={24}/>
                            }
                            {
                                error&&error
                            }
                            {
                              error3&&error3
                            }
                           
                        </Button>
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
    </>
  );
}

export default Home;
