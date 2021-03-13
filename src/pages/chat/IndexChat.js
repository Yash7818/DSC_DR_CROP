import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import JoinChat from "./JoinChat";
import Chat from "./Chat";

function ChatApp() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/join" component={JoinChat} exact />
        <Route path="/chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
}

export default ChatApp;
