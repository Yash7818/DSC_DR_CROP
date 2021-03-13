import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const messagesStyle = makeStyles({
  root: {
    padding: "5px 0",
    overflow: "auto",
    flex: "0",
    height: "80%",
  },
});

const Messages = ({ messages, name }) => {
  const classes = messagesStyle();
  return (
    <ScrollToBottom className={classes.root}>
      {messages.map((message, i) => (
        <Typography component="div" key={i}>
          <Message message={message} name={name} />
        </Typography>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
