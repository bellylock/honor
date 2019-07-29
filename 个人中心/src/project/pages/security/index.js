import React, {Component} from 'react';
import './index.scss';
import {Layout} from "antd";
const { Content } = Layout;

class Security extends Component {
    constructor(){
        super();
        this.state = {
            code:"jhu52638ki4g",
            oldPsw:'',
            newPsw:'',
            confirmPsw:''
        }
    }

    identify = () => {
        if( this.state.oldPsw == "" ){
            document.getElementById("idf_ps1").style.display = "block"
        }
        if( this.state.newPsw == "" ){
            document.getElementById("idf_ps2").style.display = "block"
        }
        if( this.state.confirmPsw == "" ){
            document.getElementById("idf_ps3").style.display = "block"
        }
        if( this.state.newPsw != this.state.confirmPsw ){
            document.getElementById("idf_ps3").style.display = "block";
            document.getElementById("idf_ps3").innerText = "两次密码输入不一致";
        }
    }

    oldblur = (e) => {
        if( this.state.oldPsw != "" ){
            document.getElementById("idf_ps1").style.display = "none"
        }else{
            document.getElementById("idf_ps1").style.display = "block"
        }
    }

    oldcge = (e) => {
        this.setState({
            oldPsw : e.target.value
        })
    }

    newblur = (e) => {
        if( this.state.newPsw != "" ){
            document.getElementById("idf_ps2").style.display = "none"
        }else{
            document.getElementById("idf_ps2").style.display = "block"
        }
    }

    newcge = (e) => {
        this.setState({
            newPsw : e.target.value
        })
    }

    confirmblur = () => {
        if( this.state.confirmPsw != "" ){
            document.getElementById("idf_ps3").style.display = "none"
        }else{
            document.getElementById("idf_ps3").style.display = "block"
        }
    }

    confirmcge = (e) => {
        this.setState({
            confirmPsw : e.target.value
        })
    }

    oldf = () =>{
        document.getElementById("idf_ps1").style.display = "none"
    }

    newf = () =>{
        document.getElementById("idf_ps2").style.display = "none"
    }

    conf = () =>{
        document.getElementById("idf_ps3").style.display = "none"
    }

    change = () => {
        var codes = "";
        var codeLength = 12;//验证码的长度
        var num = new Array(0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',
            's','t','u','v','w','x','y','z');//随机数
        for(var i = 0; i < codeLength; i++) {
            //循环操作
            var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
            codes += num[index];//根据索引取得随机数加到code上
            this.setState({
                code:codes
            })
        }
    }
    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <h2>账户安全</h2>
                <div className="securitybox">
                    <div className="modify">
                        <form action="">
                            <div className="bin">
                                <label htmlFor="">旧密码</label>
                                <input type="password" onFocus={this.oldf} onChange={this.oldcge} onBlur={this.oldblur} defaultValue={this.state.oldPsw} />
                                <p className="idf " id="idf_ps1">原密码不能为空</p>
                            </div>
                            <div className="bin">
                                <label htmlFor="">新密码</label>
                                <input type="password" onFocus={this.newf} onChange={this.newcge} onBlur={this.newblur} defaultValue={this.state.newsPsw} />
                                <p className="idf " id="idf_ps2">新密码不能为空</p>
                            </div>
                            <div className="bin">
                                <label htmlFor="">确认密码</label>
                                <input type="password" onFocus={this.conf} onChange={this.confirmcge} onBlur={this.confirmblur} defaultValue={this.state.confirmPsw} />
                                <p className="idf " id="idf_ps3">确认密码不能为空</p>
                            </div>
                        </form>
                        <a onClick={this.identify} href="javascript:;">提交</a>
                    </div>
                    <h2>API信息</h2>
                    <div className="apibox">
                        <p>
                            <span>Api ID：</span>
                            <i>10</i>
                        </p>
                        <p>
                            <span>密钥：</span>
                            <i className="codes">{this.state.code}</i>
                            <a onClick={this.change} href="jacascript:;">重新生成</a>
                        </p>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Security;