import React from 'react';
import Iconbutton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Appbar from '@material-ui/core/Appbar';
import {makeStyles,createMuiTheme,ThemeProvider} from '@material-ui/core/styles';


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
        
    }
}));


export default function NavBar(props) {
    
    const classes  = useStyles();
    const mattheme = theme;

    return(
        <div>
            <ThemeProvider theme={mattheme}>
            <div className={classes.root}>
            <Appbar position="static">
                <Toolbar>
                    <div className={classes.butdiv}>
                    <Iconbutton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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


