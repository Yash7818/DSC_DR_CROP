import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Brightness1RoundedIcon from "@material-ui/icons/Brightness1Rounded";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const infoStyle = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    background: "#2979FF",
  },
  leftSide: {
    flex: "0.5",
    display: "flex",
    alignItems: "center",
    color: "white",
    marginLeft: "5%",
  },
  onlineIcon: {
    color: "lightgreen",
    marginRight: "5%",
  },
  rightSide: {
    display: "flex",
    flex: "0.5",
    justifyContent: "flex-end",
    marginRight: "5%",
  },
  closeIcon: {
    color: "white",
  },
});

const InfoBar = ({ room }) => {
  const classes = infoStyle();
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.root}
    >
      <Typography component="div" className={classes.leftSide}>
        <Brightness1RoundedIcon className={classes.onlineIcon} />
        <h3>{room}</h3>
      </Typography>
      <Typography component="div" className={classes.rightSide}>
        <a href="/">
          <CloseIcon className={classes.closeIcon} />
        </a>
      </Typography>
    </Grid>
  );
};

export default InfoBar;
