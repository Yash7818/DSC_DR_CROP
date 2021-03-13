import React, { useState } from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    color: "white",
    padding: "150px",
  },
  button: {
    background:
      "-webkit-linear-gradient(to right, #ACBB78, #799F0C)" /* Chrome 10-25, Safari 5.1-6 */,
    background:
      "linear-gradient(to right, #ACBB78, #799F0C);" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
    margin: "5px",
    padding: "5px",
    width: "100px",
  },
});

const JoinChat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography
          variant="h3"
          component="h2"
          style={{
            fontFamily: "sans-serif",
            padding: "10px",
            borderBottom: "1px solid green",
            marginBottom: "20px",
            color: "lightgreen",
          }}
        >
          JOIN CHAT
        </Typography>
        <Typography component="div">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            type="text"
            color="primary"
            style={{
              margin: "5px",
              padding: "5px",
              width: "100%",
            }}
            onChange={(event) => setName(event.target.value)}
            required={true}
          />
        </Typography>
        <Typography component="div">
          <TextField
            id="outlined-basic"
            label="Room"
            variant="outlined"
            type="text"
            color="primary"
            style={{
              margin: "5px",
              padding: "5px",
              width: "100%",
            }}
            onChange={(event) => setRoom(event.target.value)}
            required={true}
          />
        </Typography>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            CHAT
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default JoinChat;
