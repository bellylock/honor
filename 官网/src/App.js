import React, {Component} from 'react';
import {LocaleProvider, Layout} from "antd";
import './App.styl';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {HashRouter} from "react-router-dom";
import IpHeader from "@/components/header";
import IpRouter from "@/router";
import IpFooter from "@/components/footer";
import store from "@/store";
import {observer, inject, Provider} from "mobx-react";

const {Content, Footer} = Layout;
const stores = {store};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (

            <LocaleProvider locale={zhCN}>
                <HashRouter>

                    <Layout className="content">
                        <Provider {...stores}>
                            <IpHeader> </IpHeader>
                        </Provider>
                        <Content>
                            <Provider {...stores}>
                                <IpRouter></IpRouter>
                            </Provider>
                        </Content>
                        <Footer>
                            <Provider {...stores}>
                                <IpFooter> </IpFooter>
                            </Provider>
                        </Footer>
                    </Layout>
                </HashRouter>
            </LocaleProvider>
        );
    }
}

export default App;
