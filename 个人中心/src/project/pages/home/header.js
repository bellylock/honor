import React, {Component} from 'react';
import './index.scss';
import 'antd/dist/antd.css';
import {Layout ,Icon} from 'antd';

const {Header} = Layout;

class Top extends Component {
    render() {
        return (
            <Layout style={{ height: '8vh' }}>
                <Layout>
                    <Header style={{ background: '#fff', padding: "0 15px" }} >
                        <span className="ele"><Icon type="pay-circle" />余额：<span>1523.69</span></span>
                        <a className="charge">在线充值</a>
                        <span className="ele sec"><Icon type="clock-circle" />临期账号 2</span>
                        <span className="ele"><Icon type="dashboard" />测试量 98</span>
                    </Header>
                </Layout>
            </Layout>
        );
    }
}

export default Top;

