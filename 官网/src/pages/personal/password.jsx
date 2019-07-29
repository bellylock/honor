import React, { Component, } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card,notification} from 'antd';
import QueueAnim from 'rc-queue-anim';
import axios from "@/common/axios"
import cookie from "react-cookies";
import { withRouter } from "react-router-dom";
const FormItem = Form.Item;
class Password extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount(){}
    componentDidMount() {}
    componentWillReceiveProps (newValue){}
    changePassword=(e)=>{
        e.preventDefault();
        let vm = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            const {opwd, password,password1} = values;
            if(password1!==password)
                return  notification.warning({
                    message: '提示',
                    description: "两次新密码不一致！",
                    duration : 2
                });
            axios({
                method:"post",
                url:"/user/updatePwd",
                data:{
                    password,
                    opwd
                }
            }).then((data)=>{
                if(data.code !== 0) return;
                notification.success({
                    message: '提示',
                    description: "修改密码成功！",
                    duration : 2
                })
                cookie.remove("httpipId");
                // window.location.href = "/#/login";
                vm.props.history.push('/login')
            })
        })
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return (
            // <QueueAnim type="scale" delay={100}> 
                <Card key="Password" title= "修改密码" style={{width:"700px",margin:"100px auto 50px", position:"relative",boxShadow:"0 0 32px rgba(60, 127, 208, 0.2)"}}>
                    {/* <div style={{position:"absolute",left:"calc(50% - 75px)",top:"-75px", background:"#4b98f7",height:"150px",width:"150px",borderRadius:"50%",lineHeight:"150px",textAlign:"center",color:"#fff",fontSize:"30px",fontWeight:"600"}}>HTTPIP</div> */}
                    <Form onSubmit={this.changePassword}>
                        <FormItem label="请输入旧密码"
                        {...formItemLayout}>
                        {getFieldDecorator('opwd', {
                            rules: [{ required: true, message: '请输入旧密码' }],
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"  placeholder="请输入旧密码" />
                        )}
                        </FormItem>
                        <FormItem label="请输入新密码"
                        {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入新密码!' }],
                        })(
                            <Input size="large"  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码" />
                        )}
                        </FormItem>
                        <FormItem label="请再次输入新密码"
                        {...formItemLayout}>
                        {getFieldDecorator('password1',{
                            rules: [{ required: true, message: '请再次输入新密码!' }],
                        })(
                            <Input size="large"  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入新密码" />
                        )}
                        </FormItem>
                        {/* <FormItem label="请输入验证码"
                        {...formItemLayout}>
                        {getFieldDecorator('remember')(
                            <Input size="large"  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入验证码" />
                        )}
                        </FormItem> */}
                        <p style={{marginTop:"20px",textAlign:"center"}}>
                            <Button htmlType="submit" type="primary" size="large"  style={{width:"200px"}}>
                                确定
                            </Button>
                        </p>
                    </Form>
                </Card>
            // </QueueAnim>
        )
    }
}
export default withRouter(Form.create()( Password ));