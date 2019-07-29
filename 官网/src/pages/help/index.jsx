import React, { Component } from 'react';
import { Card, Tabs, Menu, Tag } from "antd";
import axios from 'axios';
import './index.styl';
import { relativeTimeRounding } from 'moment';
const TabPane = Tabs.TabPane;
class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTable:false,
            columns:[
                {
                    title:"城市列表",
                    key:"name"
                },
                {
                    title:"混播域名",
                    key:"name1"
                },
                {
                    title:"支持类型",
                    key:"name2"
                }
            ],
            columns1:[
                {
                    title:"省份列表",
                    key:"name"
                },
                {
                    title:"混播域名",
                    key:"name1"
                },
                {
                    title:"支持类型",
                    key:"name2"
                }
            ],
            dataSource:[

            ],
            dataSource1:[

            ],
            resHtml:"<h2 style='text-align:center;line-height:40px'>如何检测IP？</h2><p>1：添加用户白名单验证IP，查看本机的公网IP，可百度查询IP</p><p>2：然后在用户中心白名单栏目中添加该IP作为IP验证</p><p>3：提取IP，打开API，动态接口界面，可根据自己需求生成获取IP的链接如何验证IP，可以点击下载IP验证工具测试IP是否可以使用，打开软件添加ET爬虫代理的资源，网页地址可以在动态接口API中生成文本API链接</p><p>4：添加完成后点击下载代理资源</p><p>5：下载完成后可以验证全部，荣耀ip代理所有IP都是私密的代理IP，成功率达到95%以上测试通过后可以根据自己的业务逻辑去使用这些IP了</p>"
        }
    }
    componentWillMount(){}
    componentDidMount() {
        axios({
            method:"get",
            url:"domain/info"
        }).then((data)=>{
            if(data.code!==0) return;
            this.setState({dataSource:data.data})
        })
    }
    componentWillReceiveProps (newValue){}
    menuClick(value){
        switch (value.key) {
            case "1":
                this.setState({showTable:false, resHtml:"<h2 style='text-align:center;line-height:40px'>如何检测IP？</h2><p>1：添加用户白名单验证IP，查看本机的公网IP，可百度查询IP</p><p>2：然后在用户中心白名单栏目中添加该IP作为IP验证</p><p>3：提取IP，打开API，动态接口界面，可根据自己需求生成获取IP的链接如何验证IP，可以点击下载IP验证工具测试IP是否可以使用，打开软件添加ET爬虫代理的资源，网页地址可以在动态接口API中生成文本API链接</p><p>4：添加完成后点击下载代理资源</p><p>5：下载完成后可以验证全部，荣耀ip代理所有IP都是私密的代理IP，成功率达到95%以上测试通过后可以根据自己的业务逻辑去使用这些IP了</p>"
            })
                break;
            case "2":
                this.setState({showTable:false,resHtml:"<h2 style='text-align:center;line-height:40px'>IE浏览器内设置代理IP</h2><p>1、获取IP之后，打开IE浏览器，选择“设置”</p><p>2、点击“Internet选项”</p><p>3、弹出“Internet选项”弹窗，选择连接—局域网设置</p><p>4、在弹出的“局域网LAN设置”中，代理服务器的复选框打上勾，并填写获取的地址及端口。点击确定</p>"})
                break;
            case "3":
                this.setState({showTable:true,resHtml:"<h2 style='line-height:40px'>全国混拨</h2>"
                +"<h2 style='line-height:40px'>省份混拨</h2>"
            });
                break;
            case "4":
                this.setState({showTable:false,resHtml:"<h2 style='text-align:center;line-height:40px'>一、如何购买套餐或续费？</h2><p>1、在官网 http://www.ryip.cn/ 上购买在官网首页，点击套餐购买，选择对应的套餐后，点击立即立即购买。</p><p>2、余额不足时联系管理员充值。</p><h2 style='text-align:center;line-height:40px'>二、掉线自动断网如何解除？</h2>"
                +"<p>掉线自动断网表示线路不稳定掉线时，本地网络会自动断开。下面以Windows7为例，设置掉线自动断网，本地网络断开后怎么连接？"

                +"<p> 1.设置掉线自动断网，出现本地网络断开的情况会看到网络连接处出现不可连接的状态，此时我们点击打开“打开网络和共享中心</p>"
                +"<p>2.打开网络和共享中心后，点击“更改适配器设置”，选择“本地链接”，此时看到本地链接的状态是“已禁用”，单击鼠标右键，选择“启用”，本地网络就会连接上</p>"
                +"<p>3.本地网络连接之后，便可继续切换IP。</p>"
                +"<h2 style='text-align:center;line-height:40px'>三、如何修改密码？</h2>"
                +"<p>1.登录后，点击个人中心模块下即可修改密码。</p>"
                });
                break;
            default:
                break;
        }
    }
    render() { 
        const { resHtml, showTable,dataSource1,columns1,columns,dataSource } = this.state;
        return(
            <Card className="home" style={{margin :"30px 50px"}}>
            <Menu mode="vertical" style={{width:"180px",float:"left"}} 
             defaultSelectedKeys={['1']} onClick = {this.menuClick.bind(this)}>
                <Menu.Item key="1"> 如何检测IP？</Menu.Item>
                <Menu.Item  key="2">IE浏览器内设置代理IP</Menu.Item>
                <Menu.Item key="3">服务器地址</Menu.Item>
                <Menu.Item key="4">常见问题</Menu.Item>
            </Menu>
            {
                showTable ?<div  style={{marginLeft:"200px"}}>
                    { Object.keys(dataSource).map((item,indexs)=>{
                        return <div key={indexs}> <h2>{item}</h2> 
                            {dataSource[item].map((items,index)=>{
                                return <div key={index} className="list">
                                        <span className="name">{items.city}</span>
                                        <span className="ip">{items.host}</span>
                                        <span className="ip">{items.t2}</span>
                                        <Tag color={items.ok==="1"?"#108ee9":"#f50"}>
                                            {["故障","正常运行","部分正常"][Number(items.ok)]}
                                        </Tag>
                                    </div>
                            })}
                        </div>
                    })}
                    
                </div> :
                <p dangerouslySetInnerHTML={{__html: resHtml}} style={{marginLeft:"200px"}}></p>
            }
        
            </Card>
        )
    }
}
export default Help;