import React, {Component} from 'react';
import './index.scss';
import {Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Index from "../index/index";
import Open from "../open_account/index";
import Arrange from "../account_arrange/index"
import Record from "../record/index"
import Whitelist from "../white_list/index"
import Finance from "../finance/index"
import Security from "../security/index"
import Subname from "../subname/index"
import Exit from "../login/login"

const { Content} = Layout;

class Main extends Component {
    render() {
        return (
            <Layout style={{ height: '92vh' }}>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Route path="/home/index" component={Index}></Route>
                        <Route path="/home/open_account" component={Open}></Route>
                        <Route path="/home/account_arrange" component={Arrange}></Route>
                        <Route path="/home/record" component={Record}></Route>
                        <Route path="/home/white_list" component={Whitelist}></Route>
                        <Route path="/home/finance" component={Finance}></Route>
                        <Route path="/home/security" component={Security}></Route>
                        <Route path="/home/subname" component={Subname}></Route>
                        <Route path="/login" component={Exit}></Route>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Main;

