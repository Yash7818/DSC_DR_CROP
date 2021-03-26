import React, { useState } from 'react';
import Iconbutton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Appbar from '@material-ui/core/Appbar';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { Redirect } from 'react-router';
import { Link,useHistory} from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import { expertLogout } from '../actions/expertActions';


const theme = createMuiTheme({
    palette: {
        primary: {
          main: "#068213",
        },
        secondary: {
          main: "#ffffff",
        },
      },
})

const useStyles = makeStyles((theme)=>({
    root:{
        flexGrow:1,
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
    paper:{
        background:"rgba(1,1,1,0.9)",
        color:"#fff",
        width:"100%",
        zIndex:"5"
    },
    menuitem:{
        color:"#fff"
    }
}));


export default function NavBar(props) {
const mattheme = theme;
const [open,setOpen] = useState(false);
const [anchor,setAnchor] = useState(null);
const [placement,setPlacement] = useState(null);
const classes = useStyles();
const dispatch = useDispatch();
const history = useHistory();
const userSignin = useSelector(state=>state.userSignin);
const {loading,userInfo,error} = userSignin;
const expertSignin = useSelector(state=>state.expertSignin);
const {loading3,expertInfo,error3} = expertSignin;


const handleClick = (translate)=>(e) =>{
    setAnchor(e.currentTarget);
    setOpen((prevopen)=>!prevopen);
    setPlacement(translate);
}
const handleClose = (e) => {
    if (anchor.current && anchor.current.contains(e.target)) {
      return;
    }
    setOpen(false);
};
const handleLogout = (e) => {
    if(userInfo){
        dispatch(logout());
    }
    else if(expertInfo){
        dispatch(expertLogout());
    }
    history.push("/");
    if (anchor.current && anchor.current.contains(e.target)) {
      return;
    }
    setOpen(false);
};



return(
        <div>
            <ThemeProvider theme={mattheme}>
            <Popper open={open} anchorEl={anchor} placement={placement} transition>
                {({TransitionProps})=>(
                    <Grow {...TransitionProps}>
                        <Paper className={classes.paper} >
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList className={classes.menulist}>
                                <Link to="/" style={{textDecoration:"none"}}><MenuItem className={classes.menuitem} onClick={handleClose}>Home</MenuItem></Link>
                                <Link to="/" style={{textDecoration:"none"}}><MenuItem className={classes.menuitem} onClick={handleClose}>About Us</MenuItem></Link>
                               { userInfo&&<div>
                                <Link to="/userprofile" style={{textDecoration:"none"}}><MenuItem className={classes.menuitem}  onClick={handleClose}>Profile</MenuItem></Link>
                                <MenuItem style={{color:"red"}} className={classes.menuitem} onClick={handleLogout}>Logout</MenuItem>
                                </div>
                                }
                                { expertInfo&&<div>
                                <Link to="/expertprofile" style={{textDecoration:"none"}}><MenuItem className={classes.menuitem}  onClick={handleClose}>Profile</MenuItem></Link>
                                <MenuItem style={{color:"red"}} className={classes.menuitem} onClick={handleLogout}>Logout</MenuItem>
                                </div>
                                }
                                <Link to="/contact" style={{textDecoration:"none"}}><MenuItem className={classes.menuitem} onClick={handleClose}>Contact Us</MenuItem></Link>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}  
            </Popper>
            <div className={classes.root}>
            <Appbar position="static">
                <Toolbar>
                    <div className={classes.butdiv}>
                    <Iconbutton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick('bottom-start')}>
                        <MenuIcon fontSize="large" />
                    </Iconbutton>
                    </div>
                    <Typography variant="h5" className={classes.title} >
                        Dr.Crop
                    </Typography>
                </Toolbar>
            </Appbar>
            </div>
            </ThemeProvider>
            
        </div>
    );
}


