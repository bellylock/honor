import React, { Component } from 'react';
import {Layout, Menu, Icon, Button, notification} from "antd";
import { Link ,withRouter } from "react-router-dom";
import menu from "@/common/menu.json";
import {observer,inject } from "mobx-react";
import  "./header.styl";
import cookie from "react-cookies";
import axios from '@/common/axios';
const { Header } = Layout;
const { Item } = Menu;
@inject(['store'])
@observer
class IpHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current:"1",
        }
    }
    componentWillMount(){
        let path = window.location.hash.replace('#','');
        menu.forEach(element => {
            if(element.key == path)
                return this.props.store.activePathChange(element.id)
        });
    }
    componentDidMount() {

    }
    menuClick=({ item, key, keyPath })=>{
        this.props.store.activePathChange(key)
        this.setState({current:key});

    }
    register=()=>{
        cookie.load("httpipId")?this.props.history.push('/personal'):this.props.history.push('/register')
    }
    login = (id)=>{
        if(id){
            axios({
                method:"get",
                url:"user/logout"
            }).then((data)=>{
                if(data.code!==0) return;
                notification.success({
                    message: '提示',
                    description: "退出登录成功！",
                    duration : 2
                })
                localStorage.removeItem("username")
                cookie.remove("httpipId");
                this.props.history.push('/home')
            })

        }else{
            this.props.history.push('/login')
        }
    }
    // personal = () =>{
    //     this.props.history.push('/personal')
    // }
    // componentWillReceiveProps (newValue){}
    render() {
        const MenuList = menu.map((item)=>{
            return <Item key={item.id.toString()}>
                <Link to={item.key}>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                </Link>
            </Item>
        })

        return(
            <Header className="header">
                <div className="container">
                    {/* <span style={{color:"#fff",float:"left",fontSize:"20px",lineHeight:"100px"}}>荣耀 ip LOGO</span> */}
                    <img className="logo" src={require("../img/logo1.png")}/>
                    {/* <a style={{float:"left",padding:"20px 0 0 20px"}} onClick={()=>this.personal()}>个人中心</a> */}
                    <Menu
                        onClick = {this.menuClick}
                        selectedKeys={[this.props.store.activePath]}
                        mode="horizontal">
                        {MenuList}
                        <Item className="btn" key="zhuce">
                            <Button type="primary" onClick={()=>this.register(cookie.load("httpipId"))}>{cookie.load("httpipId")?"个人中心":"注册"}</Button>
                        </Item>
                        <Item className="btn" key="denglu">
                            <Button type="primary" onClick={()=>this.login(cookie.load("httpipId"))}>{cookie.load("httpipId")?"注销":"登录"}</Button>
                        </Item>
                    </Menu>
                </div>
            </Header>
        )
    }
}
export default withRouter(IpHeader);
