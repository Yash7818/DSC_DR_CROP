import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";

const inputStyle = makeStyles({
  root: {
    display: "flex",
  },
  input: {
    padding: "15px",
    width: "100%",
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
      />
      <Button
        className={classes.button}
        color="primary"
        onClick={(e) => sendMessage(e)}
      >
        <SendIcon />
      </Button>
    </Typography>
  );
};

export default Input;
