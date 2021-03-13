import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import {ThemeProvider,createMuiTheme} from '@material-ui/core/styles';

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


const inputStyle = makeStyles({
  root: {
    display: "flex",
  },
  input: {
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
    padding: "15px",
    width: "100%",
  },
  text:{
    color:"#fff"
  },
  button: {
    margin: "5px",
    padding: "5px",
    width: "75px",
  },
});

const Input = ({ setMessage, sendMessage, message }) => {
  const classes = inputStyle();
  return (
    <ThemeProvider theme={theme}>
    <Typography component="form" className={classes.root}>
      <TextField
        id="standard-basic"
        placeholder="Type Your Message"
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
        className={classes.input}
        InputProps={{
          classes: {
              input: classes.text
          }
      }}
        color="secondary"
      />
      <Button
        className={classes.button}
        color="primary"
        onClick={(e) => sendMessage(e)}
      >
        <SendIcon />
      </Button>
    </Typography>
    </ThemeProvider>
  );
};

export default Input;
