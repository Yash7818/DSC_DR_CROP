import React, { useEffect, useRef } from "react";
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
    marginBottom:"7em",
    width:"100vw"
  },
});

const Messages = ({ messages, name }) => {
  const classcont = useRef(0);
  const classes = messagesStyle();
  const scrollToMyRef = () => {
    const scroll =
      classcont.current.scrollHeight -
      classcont.current.clientHeight;
      console.log(scroll)
    classcont.current.scrollTo(0, scroll);
  };
  useEffect(()=>{
    scrollToMyRef();
  })
  return (
    <>
    <div ref={classcont} className={classes.root}>
      {messages.map((message, i) => (
        <Typography component="div" key={i}>
          <Message message={message} name={name} />
        </Typography>
      ))}
    </div>
    </>
  );
};

export default Messages;
