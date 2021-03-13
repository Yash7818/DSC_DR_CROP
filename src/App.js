import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import LogIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import UserProfile from "./pages/UserProfile/userProfile";
import DisForm from "./pages/Disease/disForm";
import ExpForm from "./pages/Expert/ExpForm";
import JoinChat from "./pages/chat/JoinChat";
import Chat from "./pages/chat/Chat";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/login" exact={true} component={LogIn}></Route>
        <Route path="/signup" exact={true} component={SignUp}></Route>
        <Route path="/userprofile" exact={true} component={UserProfile}></Route>
        <Route path="/disform" exact={true} component={DisForm}></Route>
        <Route path="/expform" exact={true} component={ExpForm}></Route>
        <Route path="/join" component={JoinChat} exact />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

export default App;
