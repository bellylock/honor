import React, {Component} from 'react';
import './index.scss';
import {Layout, Steps, Upload, Icon, Modal, Select} from "antd";

const Option = Select.Option;
const { Content, } = Layout;
const Step = Steps.Step;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}


class Subname extends Component {
    constructor() {
        super();
        this.state = {
            previewVisible: false,
            previewImage: '',
            time: 60,
            btnDisable: false,
            codeMain: '发送验证码',
            cur:0,
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    }

    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({fileList}) => this.setState({fileList})

    nameblur = (e) => {
        if( e.target.value == "" ){
            document.getElementById("sps1").style.display = "block"
        }
    }
    namecge = () => {
        document.getElementById("sps1").style.display = "none"
    }

    mailblur = (e) => {
        if( e.target.value == "" ){
            document.getElementById("sps2").style.display = "block"
        }
    }
    mailcge = () => {
        document.getElementById("sps2").style.display = "none"
    }

    phoneblur = (e) => {
        if( e.target.value == "" ){
            document.getElementById("sps3").style.display = "block"
        }
    }
    phonecge = () => {
        document.getElementById("sps3").style.display = "none"
    }

    idfblur = (e) => {
        if( e.target.value == "" ){
            document.getElementById("sps4").style.display = "block"
        }
    }
    idfcge = () => {
        document.getElementById("sps4").style.display = "none"
    }

    nextstep = () => {
        document.getElementById("step1").style.display = "none";
        document.getElementById("step2").style.display = "block";
        this.setState({
            cur:1
        })
    }

    prevstep = () => {
        document.getElementById("step1").style.display = "block";
        document.getElementById("step2").style.display = "none";
        this.setState({
            cur:0
        })
    }

    confirmblur = (e) => {
        if( e.target.value == "" ){
            document.getElementById("conps1").style.display = "block"
        }
    }
    confirmcge = () => {
        document.getElementById("conps1").style.display = "none"
    }

    conpswblur = (e) => {
        if( e.target.value == "" ){
            document.getElementById("conps2").style.display = "block"
        }
    }
    conpswcge = () => {
        document.getElementById("conps2").style.display = "none"
    }

    confirmpswblur = (e) => {
        let value1 = e.target.value;
        let value2 = document.getElementById("conpsw").value;
        console.log(value1 + '---'+value2);
        if( value1 == "" ){
            document.getElementById("conps3").style.display = "block"
        }
        if( value1 == value2 ){
            return
        }else{
            document.getElementById("conps3").style.display = "block";
            document.getElementById("conps3").innerText = "两次密码输入不一致";
        }
    }
    confirmpswcge = () => {
        document.getElementById("conps3").style.display = "none"
    }

    render() {
        let timeChange;
        let ti = this.state.time;
        //关键在于用ti取代time进行计算和判断，因为time在render里不断刷新，但在方法中不会进行刷新
        const clock = () => {
            if (ti > 0) {
                //当ti>0时执行更新方法
                ti = ti - 1;
                this.setState({
                    time: ti,
                    codeMain: ti + "s之后重新发送",
                });
                console.log(ti);
            } else {
                //当ti=0时执行终止循环方法
                clearInterval(timeChange);
                this.setState({
                    btnDisable: false,
                    time: 60,
                    codeMain: "发送验证码",
                });
            }
        }
        const getCodeFunc = () => {
            this.setState({
                btnDisable: true,
                codeMain: "60s之后重新发送",
            });
            //每隔一秒执行一次clock方法
            timeChange = setInterval(clock, 1000);
        }

        const {previewVisible, previewImage, fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <Content style={{margin: '0 16px'}}>
                <div className="step">
                    <Steps progressDot current={this.state.cur}>
                        <Step title="用户信息"/>
                        <Step title="确认信息"/>
                    </Steps>
                </div>
                <div className="contextbox" id="step1">
                    <div className="bins clearfix">
                        <span><i>*</i>姓名</span>
                        <input onFocus={this.namecge} onBlur={this.nameblur} className="inp" type="text"/>
                        <p className="subps" id="sps1">姓名不能为空</p>
                    </div>
                    <div className="bins clearfix">
                        <span><i>*</i>邮箱</span>
                        <input onFocus={this.mailcge} onBlur={this.mailblur} className="inp" type="text"/>
                        <p className="subps" id="sps2">邮箱不能为空</p>
                    </div>
                    <div className="bins clearfix">
                        <span><i>*</i>手机号码</span>
                        <input onFocus={this.phonecge} onBlur={this.phoneblur} className="inp" type="number"/>
                        <p className="subps" id="sps3">手机号码不能为空</p>
                    </div>
                    <div className="bins_spe clearfix">
                        <input type="text" placeholder="请输入验证码"/>
                        {/*<Button className="send" type="primary" inline onClick={getCodeFunc} disabled={this.state.btnDisable}>{this.state.codeMain}</Button>*/}
                        <input className="send" type="button" onClick={getCodeFunc}
                               disabled={this.state.btnDisable} value={this.state.codeMain}/>
                    </div>
                    <div className="bins clearfix">
                        <span><i>*</i>身份证号</span>
                        <input onFocus={this.idfcge} onBlur={this.idfblur} className="inp" type="text"/>
                        <p className="subps" id="sps4">身份证号不能为空</p>
                    </div>
                    <div className="bins bins_img clearfix">
                        <span><i>*</i>上传身份证照</span>
                        <div className="clearfix">
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                multiple={true}
                                // fileList={fileList}  //默认需要添加时  添加该属性
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 2 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{width: '100%'}} src={previewImage}/>
                            </Modal>
                        </div>
                    </div>
                    <div className="bins bins_city clearfix">
                        <span>所在城市</span>
                        <Select
                            showSearch
                            style={{width: 414}}
                            placeholder="选择城市"
                            optionFilterProp="children"
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="昆明">昆明</Option>
                            <Option value="大理">大理</Option>
                            <Option value="丽江">丽江</Option>
                        </Select>
                    </div>
                    <div className="bins clearfix">
                        <span>备注</span>
                        <textarea name=""></textarea>
                    </div>
                    <div className="bins">
                        <a className="next" onClick={this.nextstep} href="javascript:;">下一步</a>
                    </div>
                </div>
                <div className="contextbox" id="step2" style={{display:"none"}}>
                    <div className="bins clearfix">
                        <span><i>*</i>用户名称</span>
                        <input onFocus={this.confirmcge} onBlur={this.confirmblur} className="inp" type="text"/>
                        <p className="subps" id="conps1">用户名不能为空</p>
                    </div>
                    <div className="bins clearfix">
                        <span><i>*</i>密码</span>
                        <input id="conpsw" onFocus={this.conpswcge} onBlur={this.conpswblur} className="inp" type="password"/>
                        <p className="subps" id="conps2">密码不能为空</p>
                    </div>
                    <div className="bins clearfix">
                        <span><i>*</i>确认密码</span>
                        <input onFocus={this.confirmpswcge} onBlur={this.confirmpswblur} className="inp" type="password"/>
                        <p className="subps" id="conps3">确认密码不能为空</p>
                    </div>
                    <div className="confirmbox">
                        <a className="prev" onClick={this.prevstep} href="javascript:;">上一步</a>
                        <a className="confirmbtn" href="javascript:;">确定</a>
                    </div>
                </div>
            </Content>
        );
    }
}

export default Subname;