import React from "react";
import ReactEmoji from "react-emoji";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const messageStyle = makeStyles({
  root: {
    display: "flex",
    padding: "0 5%",
    marginTop: "3px",
  },
  sendText: {
    display: "flex",
    alignItems: "center",
    color: "#828282",
    letterSpacing: "0.3px",
    paddingRight: "10px",
  },
  messageSendBox: {
    borderRadius: "20px",
    padding: "5px 20px",
    margin: "5px 0",
    color: "white",
    display: "inline-block",
    maxWidth: "80%",
    background: "#00DB3D",
  },
  messageSendText: {
    width: "100%",
    letterSpacing: 0,
    float: "left",
    fontSize: "1.1em",
    wordWrap: "break-word",
    color: "white",
  },
  messageRecieveBox: {
    borderRadius: "20px",
    padding: "5px 20px",
    margin: "5px 0",
    color: "white",
    display: "inline-block",
    maxWidth: "90%",
    background: "#F3F3F3",
  },
  messageRecieveText: {
    width: "100%",
    letterSpacing: 0,
    float: "left",
    fontSize: "1.1em",
    wordWrap: "break-word",
    color: "#353535",
  },
  recieveText: {
    display: "flex",
    alignItems: "center",
    color: "#828282",
    letterSpacing: "0.3px",
    paddingLeft: "10px",
  },
  newRoot: {
    display: "flex",
    paddingLeft: "65%",
  },
});

const Message = ({ message: { text, user }, name }) => {
  const classes = messageStyle();

  let isCurrentUser = false;
  const trimedName = name.trim().toLowerCase();

  if (user === trimedName) {
    isCurrentUser = true;
  }
  return isCurrentUser ? (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.root}
    >
      <Typography component="div" className={classes.messageSendBox}>
        <Typography component="p" className={classes.messageSendText}>
          {ReactEmoji.emojify(text)}
        </Typography>
      </Typography>
    </Grid>
  ) : (
    <Grid
      container
      direction="row"
      alignItems="center"
      className={classes.newRoot}
    >
      <Typography component="div" className={classes.messageRecieveBox}>
        <Typography component="p" className={classes.messageRecieveText}>
          {ReactEmoji.emojify(text)}
        </Typography>
      </Typography>
    </Grid>
  );
};

export default Message;
