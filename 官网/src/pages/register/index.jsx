import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, notification} from 'antd';
import Agreement from "./agreement";
import cookie from "react-cookies";
import axios from "@/common/axios"
import "./index.styl";
const FormItem = Form.Item;
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            vericode:"",
            key:"",
        }
    }
    componentWillMount(){}
    componentDidMount() {
        this.getCodeNum()
    }
    componentWillReceiveProps (newValue){}
    agreementAction=()=>{
        this.setState({visible:true})
    }
    agreenFun=(val)=>{
        this.setState({visible:val})
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            axios({
                method:"post",
                url:"http://localhost:3333/user/register",
                data:Object.assign(values,{key:this.state.key})
            }).then((data)=>{
                if(data.code != 200) return;
                notification.success({
                    message: '提示',
                    description: "注册成功！",
                    duration : 2
                })
            });
            console.log(Object.assign(values))
            // cookie.save("httpipId",'12',"0");
            // this.props.history.push('/personal')
        })
    }

    //原注册
    // handleSubmit=(e)=>{
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if(err) return;
    //         axios({
    //             method:"post",
    //             url:"user/register",
    //             data:Object.assign(values,{key:this.state.key})
    //         }).then((data)=>{
    //             if(data.code !==0) return;
    //             notification.success({
    //                 message: '提示',
    //                 description: "注册成功！",
    //                 duration : 2
    //               })
    //         })
    //         // cookie.save("httpipId",'12',"0");
    //         // this.props.history.push('/personal')
    //     })
    // }
    //获取验证码
    getCodeNum(){
        axios({
            method:"get",
            url:"vericode"
        }).then((response)=>{
            if(response.status != 200) return;
            this.setState({vericode:`data:image/jpeg;base64,${response.data}`,key:response.headers.key})
            
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {vericode, key } = this.state;
        return(
            <Card style={{width:"500px",margin:"100px auto 50px",padding:" 0 50px", position:"relative",boxShadow:"0 0 32px rgba(60, 127, 208, 0.2)"}}>
                <h1 style={{textAlign:"center"}}>荣耀 IP</h1>
                {/* <div style={{position:"absolute",left:"calc(50% - 75px)",top:"-75px", background:"#4b98f7",height:"150px",width:"150px",borderRadius:"50%",lineHeight:"150px",textAlign:"center",color:"#fff",fontSize:"30px",fontWeight:"600"}}>HTTPIP</div> */}
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input id="name" size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input size="large"  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                    )}
                    </FormItem>
                    <FormItem style={{position:"relative"}}>
                    <span style={{position:"absolute",left:"150px",width:"200px"}}>
                        <img src={ vericode } onClick={this.getCodeNum.bind(this)} style={{marginBottom:20,width:"100px"}}/>
                        <a onClick={this.getCodeNum.bind(this)} style={{marginLeft:"10px"}} title="点击更换验证码">
                            更换验证码
                        </a>
                    </span>
                    {getFieldDecorator('vericode', {
                        rules: [{ required: true, message: '请输入图形验证码!' }],
                    })(
                        <Input style={{width:"130px"}} size="large"   prefix={<Icon type="security-scan" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="图形验证码" />
                    )}
                    </FormItem>
                    <FormItem>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入手机号!' }],
                    })(
                        <Input size="large"  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入手机号" />
                    )}
                    </FormItem>
                    {/* <FormItem>
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: '请输入短信验证码!' }],
                    })(
                        <Input.Search enterButton="获取验证码"  prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入短信验证码" />
                        // <Input size="large"  prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入短信验证码" />
                    )}
                    </FormItem> */}
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: false,
                            rules: [{ required: true, validator:(rule, value, callback)=>{
                                value === true ? callback() : callback(true)
                            } , message: '请勾选!' }]
                        })(
                            <Checkbox>我同意</Checkbox>
                        )}
                        <a onClick={()=>{this.agreementAction()}}>《荣耀ip协议》</a>
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit" type="primary"  block style={{height:"50px",borderRadius:"25px"}}>
                            立即注冊
                        </Button>
                    </FormItem>
                </Form>
                <Agreement visible={this.state.visible} agreenFun={this.agreenFun}/>
            </Card>
        )
    }
}
export default Form.create()(Register);