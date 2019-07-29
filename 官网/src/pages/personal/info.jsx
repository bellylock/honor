import React, { Component } from 'react';
import { Collapse, List,Form, Card, Input } from 'antd';
import QueueAnim from 'rc-queue-anim';
import axios from "@/common/axios"
import moment from "moment"
const Panel = Collapse.Panel;
const FormItem = Form.Item;
class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personalData:[
               
            ],
            userData:[]
        }
    }
    componentWillMount(){}
    componentDidMount() {
        this.getInfo()
    }
    componentWillReceiveProps (newValue){}
    getInfo(){
        axios({
            method:"post",
            url:"/user/info"
        }).then((data)=>{
            if(data.code !== 0) return;
            let user = data.data;
            let personalData=[
                {
                    title:"用户名",
                    info:user.username
                },
                {
                    title:"手机号码",
                    info:user.phone
                }
            ];
            let userData =[{
                title:"用户名",
                info:user.username
            },
            {
                title:"手机号码",
                info:user.phone
            },
            {
                title:"最近登录时间",
                info:user.loginTime
            },
            {
                title:"最近登录IP地址",
                info:user.loginIp
            },
            {
                title:"注册时间",
                info:moment(user.createAt*1000).format("YYYY-MM-DD  HH:mm:ss")
            },
            {
                title:"账户余额",
                info:`${user.balance}元`
            },
            {
                title:"VIP等级",
                info:user.vipLevel
            },
            {
                title:"状态",
                info:user.enable?"可用":"不可用"
            }]
            this.setState({userData,personalData})
        })
    }
    render() {
        const { personalData, userData } = this.state;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 5 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
            },
          };
        return(
            // <QueueAnim type="scale" delay={100}> 
               /* <Collapse defaultActiveKey={['1','2']} key="Info">
                    <Panel header="个人资料" key="1">
                        <List
                            itemLayout="horizontal"
                            dataSource={personalData}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                title={item.title}
                                description={item.info}
                                />
                            </List.Item>
                            )}
                        />
                    </Panel>
                    <Panel header="用户信息" key="2">
                        <List
                            itemLayout="horizontal"
                            dataSource={userData}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                title={item.title}
                                description={item.info}
                                />
                            </List.Item>
                            )}
                        />
                    </Panel>
                </Collapse> */
                <Card title="账户信息" style={{width:"700px",margin:"0 auto", position:"relative",boxShadow:"0 0 32px rgba(60, 127, 208, 0.2)"}}>
                    <Form>
                        {
                            userData.map((item)=>{
                                return <FormItem {...formItemLayout} label={item.title}>
                                        {/* <Input value={item.info} disabled/>  */}
                                        {item.info}   
                                        </FormItem>
                            })
                        }
                        
                    </Form>
                </Card>
            // </QueueAnim>
        )
    }
}
export default Info;