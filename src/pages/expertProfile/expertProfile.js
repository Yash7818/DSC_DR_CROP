import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import CreateIcon from '@material-ui/icons/Create';
import {makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core/styles';

import NavBar from '../../components/Navbar';
import Styles from './userprofile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { listRequest } from '../../actions/requestActions';
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


export default function ExpertProfile() {
    const [data1,setData] = useState([]);
    const classes  = useStyles();
    const dispatch = useDispatch();
    const expertSignin = useSelector(state=>state.expertSignin);
    const {loading3,expertInfo,error3} = expertSignin;

    // dispatch(listRequest());
    const requestList = useSelector(state=>state.requestList);
    console.log(expertInfo)
    
   const requests = () => async()=>{
    const {data}  = await axios.get("/api/request/getrequest", {
        headers: {
            Authorization: "Bearer " + expertInfo.token,
        },
        });
    console.log(data);
   }

    useEffect(()=>{
        
        const {data}  =  axios.get("/api/request/getrequest", {
            headers: {
                Authorization: "Bearer " + expertInfo.token,
            },
            });
        console.log(data);
        if(data){
            setData(data);
        }
    // fetch("https://dr-crop-backend.azurewebsites.net/api/request/getrequest",{
    //     headers: {
    //                 Authorization: "Bearer " + expertInfo.token,
    //             },
    // }).then((res)=>{
    //     setData(res.data);
    // }).catch((e)=>{
    //     console.log(e);
    // })
    // dispatch(listRequest());
    // console.log(data);

    },[data1])


    return(
        <div>
            <ThemeProvider theme={theme}>
            <NavBar />
                <Grid item container alignItems="center" justify="center" direction="column" className={Styles.avatar}>
                <Badge
                   overlap="circle"
                   anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                   }}
                   badgeContent={<IconButton style={{background:"#4caf50"}}><CreateIcon /></IconButton>}
                   >
                     <Avatar className={classes.avatar}></Avatar>
                     </Badge>
                <Typography align="center" style={{color:"#fff",fontSize:"1.5em",marginTop:"1em"}}>
                    @{expertInfo.name}
                </Typography>
                </Grid> 
                <Typography variant="h5" style={{margin:"1em",color:"#fff",borderBottom:"2px solid #fff"}}>
                    Requests
                </Typography>
                <Grid container item style={{padding:"1em",color:"#fff"}} >
                
                    {data1.length>0?data1.map((item,index)=>(<Grid key={index} item container direction="row" className={classes.butarea}>
                        <Grid>
                        <Grid item container direction="row" >
                        <Typography variant="h6">
                            {item.title}
                        </Typography>
                        {/* <Typography justify="center" style={{fontSize:".8em"}}>
                            ({item.language})
                        </Typography> */}
                        </Grid>
                        <Typography>
                            {item.content}
                        </Typography>
                       
                        </Grid>
                        <Grid>
                        <Button variant="outlined" color="secondary" style={{margin:"1em 0em 1em 2em"}}><Link style={{textDecoration:"none",color:"#fff"}} to={item.mediumLink}>Get In</Link></Button>
                        </Grid>
                    </Grid>)):<CircularProgress size={50}></CircularProgress>}
                </Grid>
                </ThemeProvider>
        </div>
    );
}


