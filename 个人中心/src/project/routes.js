import React, {Component} from 'react';
// import {BrowserRouter  as Router, Route, Redirect} from 'react-router-dom';
//打包时  把BrowserRouter换成HashRouter
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';
import Login from './pages/login/login';
import Home from './pages/home/index';
import Finance from './pages/finance/index';
import Open from './pages/open_account/index'


class Routes extends Component {
    render() {
        return (
            <Router >
                <div>
                    <Route path='/' exact render={()=> (
                        <Redirect to="/login"/>
                    )}/>
                    <Route path="/login" component={Login }></Route>
                    <Route path="/home" component={Home}></Route>
                    {/*<Route exact path="/home/finance" component={Finance}></Route>*/}
                    {/*<Route exact path="/home/open_account" component={Open}></Route>*/}
                    {/*<Redirect to="/login"></Redirect>*/}
                </div>
            </Router>
        );
    }
}

export default Routes;

















