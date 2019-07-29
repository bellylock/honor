import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, notification} from 'antd';
import { withRouter } from "react-router-dom";
import cookie from "react-cookies";
import "./index.styl";
import axios from "@/common/axios"
const FormItem = Form.Item;
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vericode:"",
            key:"",
            img:""
        }
    }
    componentWillMount(){}
    componentDidMount() {
        this.getCodeNum()
    }
    componentWillReceiveProps (newValue){ }
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
    handleSubmit = (e)=>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            axios({
                method:"post",
                url:"http://localhost:3333/user/login",
                data:Object.assign(values,{key:this.state.key})
            }).then((data)=>{
                if(data.code != 200) return;
                notification.success({
                    message: '提示',
                    description: "登录成功！",
                    duration : 2
                });
                console.log(Object.assign(values,{key:this.state.key}));
                localStorage.username = values.username;
                // cookie.save("httpipId",data.data,"0");
                this.props.history.push('/home')
            })

        })
    }

    //原登录请求
    // handleSubmit = (e)=>{
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if(err) return;
    //         axios({
    //             method:"post",
    //             url:"user/login",
    //             data:Object.assign(values,{key:this.state.key})
    //         }).then((data)=>{
    //             if(data.code !== 0) return;
    //             notification.success({
    //                 message: '提示',
    //                 description: "登录成功！",
    //                 duration : 2
    //             });
    //             localStorage.username = values.username;
    //             cookie.save("httpipId",data.data,"0");
    //             this.props.history.push('/personal')
    //         })
    //         // cookie.save("httpipId",'12',"0");
    //
    //     })
    // }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { vericode } = this.state;
        return (
            <Card style={{width:"500px",margin:"100px auto 50px",padding:" 0 50px", position:"relative",boxShadow:"0 0 32px rgba(60, 127, 208, 0.2)"}}>
                <h1 style={{textAlign:"center"}}>荣耀 IP</h1>
                {/* <div style={{position:"absolute",left:"calc(50% - 75px)",top:"-75px", background:"#4b98f7",height:"150px",width:"150px",borderRadius:"50%",lineHeight:"150px",textAlign:"center",color:"#fff",fontSize:"30px",fontWeight:"600"}}>HTTPIP</div> */}
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
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
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    <a>忘记密码</a>
                    Or <a href="#/register">还没有账号</a>
                    <p style={{marginTop:"20px"}}>
                        <Button htmlType="submit" type="primary" block style={{height:"50px",borderRadius:"25px"}}>
                            登录
                        </Button>
                    </p>
                    </FormItem>
                </Form>
            </Card>
        );
    }
}
export default withRouter(Form.create()(Login));