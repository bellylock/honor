import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import BuyRecords from "@/pages/personal/buyrecords";
import Buy from "@/pages/personal/buy";
import Info from "@/pages/personal/info";
import IP from "@/pages/personal/IP";
import Password from "@/pages/personal/password";
import Records from "@/pages/personal/records";
import Use from "@/pages/personal/use";

class PersonalRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount(){}
    componentDidMount() {}
    // componentWillReceiveProps (newValue){}
    render() {
        return(
            <div>
                <Switch>
                    <Route exact path='/personal' render={()=> (
                        <Redirect to="/personal/info"/>
                    )}/>
                    <Route path="/personal/info" component={Info} />
                    <Route path="/personal/buyRecords" component={BuyRecords} />
                    <Route path="/personal/IP" component={IP} />
                    <Route path="/personal/password" component={Password} />
                    <Route path="/personal/records" component={Records} />
                    <Route path="/personal/buy" component={Buy} />
                    <Route path="/personal/use" component={Use} />
                </Switch>
            </div>
        )
    }
}
export default  PersonalRouter;