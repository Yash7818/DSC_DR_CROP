import React from 'react';
import {Link} from 'react-router-dom';

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
import { useSelector } from 'react-redux';

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


export default function UserProfile() {
    
    const classes  = useStyles();
    const userSignin = useSelector(state=>state.userSignin);
    const {loading,userInfo,error} = userSignin;


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
                    @{userInfo.name}
                </Typography>
                </Grid> 
                <Grid container item style={{padding:"1em",color:"#fff"}} >
                    <Grid className={classes.butarea}>
                        <Grid>
                            <Typography variant="h5" >
                                Know the Disease
                            </Typography>   
                            <Typography style={{padding:"1em 0"}}>
                                Find the information of the disease and plant.
                                Be informative about the infection to save your previous crops
                                and prevent further damage by just clicking a photo.
                            </Typography>
                        </Grid>
                        <Grid>
                            <Link to="/disform"><Button variant="outlined" color="secondary">Proceed</Button></Link>
                        </Grid>
                    </Grid>
                    <Grid className={classes.butarea}>
                        <Grid>
                            <Typography variant="h5" >
                                Enquire with our experts
                            </Typography>   
                            <Typography style={{padding:"1em 0"}}>
                               Find solution of your doubts with our experts and 
                               find a refernece to increase your production.Resolve your queries
                               by enquiring in your native language with a simple form.
                            </Typography>
                        </Grid>
                        <Grid>
                            <Link to="/expform"><Button variant="outlined" color="secondary">Proceed</Button></Link>
                        </Grid>
                    </Grid>
                </Grid>
                </ThemeProvider>
        </div>
    );
}


