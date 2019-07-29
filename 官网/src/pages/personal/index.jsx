import React, { Component } from 'react';
import {Layout, Menu, Icon, Button, Card} from "antd";
import { Link ,withRouter } from "react-router-dom";
import menu from "@/common/personal.json";
import PersonalRouter from "@/router/personal";
import QueueAnim from 'rc-queue-anim';
import axios from "@/common/axios"
import {observer,inject } from "mobx-react";

const { Header , Sider} = Layout;
const { Item, SubMenu } = Menu;
@inject(['store'])
@observer
class Personal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current:"1",
            show:false,
            username:"xxxx",
            balance:0,
            vipLevel:"",

        }
    }
    componentWillMount(){
         this.setState({show:true})
         this.getInfo()
    }
    componentDidMount() {}
    componentWillReceiveProps (newValue){}
    menuClick=({ item, key, keyPath })=>{
        this.setState({current:key})
    }
    getInfo(){
        axios({
            method:"post",
            url:"/user/info"
        }).then((data)=>{
            if(data.code !== 0) return;
            const { username, balance, vipLevel } = data.data;
            // this.setState({username,balance,vipLevel})
            this.props.store.changeUserInfo({username, balance, vipLevel});

        })
    }
    render() {
        const MenuList = menu.map((item)=>{
            if(item.child){
                return <SubMenu key={item.id.toString()} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                        { item.child.map((items) =>{
                                    return <Item key={items.id.toString()}>
                                        <Link to={items.key}>
                                            {/* <Icon type={items.icon} /> */}
                                            <span>{items.name}</span>
                                        </Link>
                                    </Item>
                                }
                            )
                        }
                    </SubMenu>
            }
            else
                return <Item key={item.id.toString()}>
                            <Link to={item.key}>
                                <Icon type={item.icon} />
                                <span>{item.name}</span>
                            </Link>
                        </Item>
        })
        // const {show,username,balance,vipLevel} = this.state;
        const {username,balance,vipLevel} =this.props.store.userInfo
        return(
            <div style={{margin:"20px 50px"}}>
                <Layout>
                    <Sider style={{background:"#fff"}}>
                        <QueueAnim type="left" delay={200}> 
                            <div key="Personal" style={{background: "#4b98f7",padding:"15px 0 0 30px",height:"100px",color:"#eee",fontSize:"16px"}}>
                                {/* <Icon type="smile" style={{marginRight:"15px"}}/> */}
                                <div>用户名:{username}</div>
                                <div>用户等级:{vipLevel}</div>
                                <div>用户金额:{balance}元</div>
                            </div>
                            <Menu
                                onClick = {this.menuClick}
                                theme="light"
                                key="22"
                                defaultOpenKeys={['11']}
                                selectedKeys={[this.state.current]}
                                mode="inline">
                                    {MenuList}
                            </Menu>
                        </QueueAnim>
                    </Sider>
                    
                    <Layout style={{margin:"20px 30px"}}>
                        <PersonalRouter />
                    </Layout>
                </Layout>
                
            </div>
        )
    }
}
export default Personal;