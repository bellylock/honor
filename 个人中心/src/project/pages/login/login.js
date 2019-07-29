import React, {Component} from 'react';
import './login.scss';
import 'antd/dist/antd.css';
import {Form, Icon, Input, Button, Checkbox,} from 'antd';
import axios from 'axios'

class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let pass = {
                    username:values.userName,
                    password:values.password,
                    key:values.userName
                };
                axios.post("http://localhost:3333/userLogin",pass
                ).then( (res) => {
                    console.log(values);
                    if( res.data.code == 200){
                        console.log(res.data.data.token);
                        sessionStorage.setItem("key",values.userName);
                        this.props.history.push('/home/index');
                        // console.log('Received values of form: ', values);
                    }
                }).catch( (err) => {
                    console.log(err)
                });
            }
        });

        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.history.push('/home/index');
        //         console.log('Received values of form: ', values);
        //     }
        // });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="logbox">
                <div className="cabin">
                    <h1>登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot forget" href="">忘记密码</a>
                            <Button type="primary" htmlType="submit" className="login-form-button log">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create({ name: 'normal_login' })(Login);
