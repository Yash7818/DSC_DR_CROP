import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import UserProfile from './pages/UserProfile/userProfile';
import DisForm from './pages/Disease/disForm';
import ExpForm from './pages/Expert/ExpForm';
function App() {
  return (
   <Router>
     <Switch>
       <Route path="/" exact={true} component={Home}></Route>
       <Route path="/userprofile" exact={true} component={UserProfile}></Route>
       <Route path="/disform" exact={true} component={DisForm}></Route>
       <Route path="/expform" exact={true} component={ExpForm}></Route>
     </Switch>
   </Router>
  );
}

export default App;
