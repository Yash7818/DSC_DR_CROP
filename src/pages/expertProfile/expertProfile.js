<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import CreateIcon from "@material-ui/icons/Create";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import NavBar from "../../components/Navbar";
import Styles from "./userprofile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { listRequest } from "../../actions/requestActions";
import { CircularProgress } from "@material-ui/core";
=======
import React, { useCallback, useEffect, useState } from 'react';
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
import { listRequest, updateOneRequest } from '../../actions/requestActions';
import { CircularProgress } from '@material-ui/core';
>>>>>>> origin/master

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#ffffff",
    },
<<<<<<< HEAD
  },
});
=======
    title:{
        fontWeight:"700",
        marginRight:theme.spacing(2)
        
    },
    avatar:{
        height:theme.spacing(20),
        width:theme.spacing(20),
        background:"#f1f1f1"
    },
    butarea:{
        border:"2px solid #fff",
        padding:"1em",
        borderRadius:"1em",
        margin:"1em 0",
        width:"100%"
    }
}));
>>>>>>> origin/master

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  butdiv: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontWeight: "700",
    marginRight: theme.spacing(2),
  },
  avatar: {
    height: theme.spacing(20),
    width: theme.spacing(20),
  },
  butarea: {
    border: "2px solid #fff",
    padding: "1em",
    borderRadius: "1em",
    margin: "1em 0",
    width: "100%",
  },
}));

export default function ExpertProfile() {
  const [data1, setData] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const expertSignin = useSelector((state) => state.expertSignin);
  const { loading3, expertInfo, error3 } = expertSignin;

   
   const handleAccept = (requestId,status) =>{
       dispatch(updateOneRequest(requestId,status));
       console.log(requestId,status)
   } 

   const fetchMyAPI = useCallback(async () => {
    const { data } = await axios.get("/api/request/getrequest", {
      headers: {
        Authorization: "Bearer " + expertInfo.token,
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
                <Grid item container alignItems="center" justify="center" direction="column" className={Styles.avatar}>
                <Badge
                   overlap="circle"
                   anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                   }}
                   badgeContent={<IconButton style={{background:"#4caf50"}}><CreateIcon /></IconButton>}
                   >
                     <Avatar className={classes.avatar} src="https://res.cloudinary.com/marcos-yash/image/upload/v1616877820/avatar1_kijavl_iopsya.png"></Avatar>
                     </Badge>
                <Typography align="center" style={{color:"#fff",fontSize:"1.5em",marginTop:"1em"}}>
                    @{expertInfo.name}
                </Typography>
                </Grid> 
                <Typography variant="h5" style={{margin:"1em",color:"#fff",borderBottom:"2px solid #fff"}}>
                    Requests
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
                          <Button variant="outlined" color="secondary" style={{margin:"1em 0em"}}><Link style={{textDecoration:"none",color:"#fff"}} to={`/chat?name=${expertInfo.name}&room=${item.mediumLink}`}>Get In</Link></Button>
                          <Button variant="outlined" color="secondary" style={{margin:"1em 0em"}} onClick={()=>handleAccept(item._id,true)}>Accept</Button>
                        </Grid>
                    </Grid>)):<Grid item container justify="center" alignItems="center"><CircularProgress size={50}></CircularProgress></Grid>}
                </Grid>
              </Grid>
            ))
          ) : (
            <CircularProgress size={50}></CircularProgress>
          )}
        </Grid>
      </ThemeProvider>
    </div>
  );
}
