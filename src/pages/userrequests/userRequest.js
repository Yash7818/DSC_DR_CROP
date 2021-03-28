import React, { useCallback, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core/styles';

import NavBar from '../../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

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

const useStyles = makeStyles((theme)=>({
    root:{
        flexGrow:1
    },
    butdiv:{
        flexGrow:1,
    },
    menuButton:{
        marginRight:theme.spacing(2),
    },
    title:{
        fontWeight:"700",
        marginRight:theme.spacing(2)
        
    },
    avatar:{
        height:theme.spacing(20),
        width:theme.spacing(20)
    },
    butarea:{
        border:"2px solid #fff",
        padding:"1em",
        borderRadius:"1em",
        margin:"1em 0",
        width:"100%"
    }
}));


export default function UserRequest() {
    const [data1,setData] = useState([]);
    const classes  = useStyles();
    const dispatch = useDispatch();
    const userSignin = useSelector(state=>state.userSignin);
    const {loading,userInfo,error} = userSignin;


   const fetchMyAPI = useCallback(async () => {
    const { data } = await axios.get("/api/request/userrequest", {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    console.log(data);
    if (data) {
      setData(data);
    }
  }, [data1]);

  useEffect(() => {
    fetchMyAPI();
  }, []);


    return(
        <div>
            <ThemeProvider theme={theme}>
            <NavBar />

                <Typography variant="h5" style={{margin:"1em",marginTop:"5em",color:"#fff",borderBottom:"2px solid #fff"}}>
                    All Requests
                </Typography>
                <Grid container item style={{padding:"1em",color:"#fff"}} >
                
                    {data1.length>0?data1.map((item,index)=>(<Grid key={index} item container direction="column" className={classes.butarea}>
                        <Grid>
                        <Grid item container  >
                        <Typography variant="h6">
                            {item.title} {"   "}({item.language})
                        </Typography>
                        </Grid>
                        <Typography>
                            {item.content}
                        </Typography>
                       
                        </Grid>
                        <Grid item container justify="space-between">
                          <Button variant="outlined" disabled={item.status?false:true} color="secondary" style={{margin:"1em 0em"}}><Link style={{textDecoration:"none",color:"#fff"}} to={`/chat?name=${userInfo.name}&room=${item.mediumLink}`}>Get In</Link></Button>
                           <Button variant="outlined" disabled style={{color:item.status?"#00DB3D":"#fff"}}>
                               {item.status?"Accepted":"Not Accepted"}
                           </Button>
                        </Grid>
                    </Grid>)):(<Grid item container justify="center" alignItems="center"><CircularProgress size={50}></CircularProgress></Grid>)}
                </Grid>
                </ThemeProvider>
        </div>
    );
}


