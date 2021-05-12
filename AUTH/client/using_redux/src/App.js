import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Main from "./components/main";
import Signup from "./components/signup";
function App(){

    return(
        
    <Router>
        <h1>Auth APP</h1>
        <Main/>
        <div className="container mt-3">
            <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
            </Switch>
      </div>
    </Router>
    )
}

export default App;