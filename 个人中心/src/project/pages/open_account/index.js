import React, {Component} from 'react';
import './index.scss';
import { Tabs } from 'antd';
import {Select} from 'antd';

//tab
const TabPane = Tabs.TabPane;

function callback(key) {
    console.log(key);
}

//select
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

class Open extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            psw: '',
            account: '',
            pw: '',
            linknum: 1,
            price: 1,
            acm:'',
            figure:'',
            mpw:'',
            mnum:1,
            mprice:1
        }
    }

    //批量开
    handelChange(e) {
        console.log(e.target.value);
        this.setState({
            inpValu: e.target.value
        });
        if (e.target.value == "") {
            console.log(123)
        }
    }

    //测试账号
    submit = () => {
        var name = this.state.name;
        var psw = this.state.psw;
        if (name == "") {
            document.getElementById("ps1").style.display = "block"
        }
        if (psw == "") {
            document.getElementById("ps2").style.display = "block"
        }
    };

    namechange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    pswchange = (e) => {
        this.setState({
            psw: e.target.value
        });
    };

    nameblur = () => {
        var name = this.state.name;
        if (name = !"") {
            document.getElementById("ps1").style.display = "none"
        }
    };

    pswblur = () => {
        var psw = this.state.psw;
        if (psw = !"") {
            document.getElementById("ps2").style.display = "none"
        }
    };

    //单开账号
    consfirm = () => {
        var account = this.state.account;
        var pw = this.state.pw;
        var linknum = this.state.linknum;
        var price = this.state.price;
        if (account == "") {
            document.getElementById("ps3").style.display = "block"
        }else{
            document.getElementById("ps3").style.display = "none"
        }
        if (pw == "") {
            document.getElementById("ps4").style.display = "block"
        }else{
            document.getElementById("ps4").style.display = "none"
        }
        if (linknum == "") {
            document.getElementById("ps5").style.display = "block"
        }else{
            document.getElementById("ps5").style.display = "none"
        }
        if (price == "") {
            document.getElementById("ps6").style.display = "block"
        }else{
            document.getElementById("ps6").style.display = "none"
        }
    }

    accountchange = (e) => {
        this.setState({
            account : e.target.value
        })
    }

    pwchange = (e) => {
        this.setState({
            pw : e.target.value
        })
    }

    numberchange = (e) => {
        this.setState({
            linknum : e.target.value
        })
    }

    pricechange = (e) => {
        this.setState({
            price : e.target.value
        })
    }

    accountblur = () => {
        var account = this.state.account;
        if (account = !"") {
            document.getElementById("ps3").style.display = "none"
        }
    }

    pwblur = () => {
        var pw = this.state.pw;
        if (pw = !"") {
            document.getElementById("ps4").style.display = "none"
        }
    }

    numberblur = () => {
        var number = this.state.number;
        if (number = !"") {
            document.getElementById("ps5").style.display = "none"
        }
    }

    priceblur = () => {
        var price = this.state.price;
        if (price = !"") {
            document.getElementById("ps6").style.display = "none"
        }
    }

    //批量开号
    determine = () => {
        var acm = this.state.acm;
        var figure = this.state.figure;
        var mpw = this.state.mpw;
        var mnum = this.state.mnum;
        var mprice = this.state.mprice;
        if (acm == "") {
            document.getElementById("ps7").style.display = "block"
        }else{
            document.getElementById("ps7").style.display = "none"
        }
        if (figure == "") {
            document.getElementById("ps8").style.display = "block"
        }else{
            document.getElementById("ps8").style.display = "none"
        }
        if (mpw == "") {
            document.getElementById("ps9").style.display = "block"
        }else{
            document.getElementById("ps9").style.display = "none"
        }
        if (mnum == "") {
            document.getElementById("ps10").style.display = "block"
        }else{
            document.getElementById("ps10").style.display = "none"
        }
        if (mprice == "") {
            document.getElementById("ps11").style.display = "block"
        }else{
            document.getElementById("ps11").style.display = "none"
        }
    }

    acmblur = () => {
        var acm = this.state.acm;
        if (acm = !"") {
            document.getElementById("ps7").style.display = "none"
        }
    }

    figureblur = () => {
        var figure = this.state.figure;
        if (figure = !"") {
            document.getElementById("ps8").style.display = "none"
        }
    }

    mpwblur = () => {
        var mpw = this.state.figure;
        if (mpw = !"") {
            document.getElementById("ps9").style.display = "none"
        }
    }

    mnumblur = () => {
        var mnum = this.state.mnum;
        if (mnum = !"") {
            document.getElementById("ps10").style.display = "none"
        }
    }

    mpriceblur = () => {
        var mprice = this.state.mprice;
        if (mprice = !"") {
            document.getElementById("ps11").style.display = "none"
        }
    }

    acmchange = (e) => {
        this.setState({
            acm : e.target.value
        })
    }

    figurechange = (e) => {
        this.setState({
            figure : e.target.value
        })
    }

    mpwchange = (e) => {
        this.setState({
            mpw : e.target.value
        })
    }

    mnumchange = (e) => {
        this.setState({
            mnum : e.target.value
        })
    }

    mpricechange = (e) => {
        this.setState({
            mprice : e.target.value
        })
    }

    render() {
        return (
            <div className="openbox">
                <h2>新开账号</h2>
                <div className="context">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="测试账号" key="1">
                            <div className="newbin">
                                <form action="">
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>账号：</label>
                                        <input className="inp" type="text" placeholder="请输入账号" onBlur={this.nameblur}
                                               onChange={this.namechange} defaultValue={this.state.name}/>
                                        <p className="ps" id="ps1">账号不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>密码：</label>
                                        <input className="inp" type="text" placeholder="请输入账号" onBlur={this.pswblur}
                                               onChange={this.pswchange} defaultValue={this.state.psw}/>
                                        <p className="ps" id="ps2">密码不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor="">留言：</label>
                                        <textarea name="" placeholder="留言"></textarea>
                                    </div>
                                    <div className="box lastbox">
                                        <a href="###" onClick={this.submit}>确定</a>
                                    </div>
                                </form>
                            </div>
                        </TabPane>
                        <TabPane tab="单开账号" key="2">
                            <div className="newbin">
                                <form action="">
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>账号：</label>
                                        <input className="inp" type="text" placeholder="请输入账号" onBlur={this.accountblur}
                                               onChange={this.accountchange} defaultValue={this.state.account}/>
                                        <p className="ps" id="ps3">账号不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>密码：</label>
                                        <input className="inp" type="password" placeholder="请输入账号" onBlur={this.pwblur}
                                               onChange={this.pwchange} defaultValue={this.state.pw}/>
                                        <p className="ps" id="ps4">密码不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>链接：</label>
                                        <input type="number" min="1" className="nums inp" onBlur={this.numberblur}
                                               onChange={this.numberchange} defaultValue={this.state.linknum}/>
                                        <i>注明：选择几个链接，单帐号可同时登陆终端数</i>
                                        <p className="ps" id="ps5">链接数不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>价格：</label>
                                        <input type="number" min="1" className="nums inp" onBlur={this.priceblur}
                                               onChange={this.pricechange} defaultValue={this.state.price}/>
                                        <Select
                                            showSearch
                                            style={{ width: 150 }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="jack">天/4.00元</Option>
                                            <Option value="lucy">周/20.00元</Option>
                                            <Option value="tom">月/60.00元</Option>
                                        </Select>
                                        <p className="ps" id="ps6">价格不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor="">留言：</label>
                                        <textarea name="" placeholder="留言"></textarea>
                                    </div>
                                    <div className="box lastbox">
                                        <a href="###" onClick={this.consfirm}>确定</a>
                                    </div>
                                </form>
                            </div>
                        </TabPane>
                        <TabPane tab="批量开号" key="3">
                            <div className="newbin">
                                <form action="">
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>账号：</label>
                                        <input className="inp" type="text" placeholder="请输入账号" onBlur={this.acmblur}
                                               onChange={this.acmchange} defaultValue={this.state.acm}/>
                                        <p className="ps" id="ps7">账号不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>数量：</label>
                                        <input className="inp" type="password" placeholder="请输入数量" onBlur={this.figureblur}
                                               onChange={this.figurechange} defaultValue={this.state.figure}/>
                                        <p className="ps" id="ps8">数量不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>密码：</label>
                                        <input className="inp" type="password" placeholder="请输入账号" onBlur={this.mpwblur}
                                               onChange={this.mpwchange} defaultValue={this.state.mpw}/>
                                        <p className="ps" id="ps9">密码不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>链接：</label>
                                        <input type="number" min="1" className="nums inp" onBlur={this.mnumblur}
                                               onChange={this.mnumchange} defaultValue={this.state.mnum}/>
                                        <p className="ps" id="ps10">链接数不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor=""><span>*</span>价格：</label>
                                        <input type="number" min="1" className="nums inp" onBlur={this.mpriceblur}
                                               onChange={this.mpricechange} defaultValue={this.state.mprice}/>
                                        <Select
                                            showSearch
                                            style={{ width: 150 }}
                                            placeholder="请选择"
                                            optionFilterProp="children"
                                            onChange={handleChange}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value="jack">天/4.00元</Option>
                                            <Option value="lucy">周/20.00元</Option>
                                            <Option value="tom">月/60.00元</Option>
                                        </Select>
                                        <p className="ps" id="ps11">价格不能为空</p>
                                    </div>
                                    <div className="box">
                                        <label htmlFor="">留言：</label>
                                        <textarea name="" placeholder="留言"></textarea>
                                    </div>
                                    <div className="box lastbox">
                                        <a href="###" onClick={this.determine}>确定</a>
                                    </div>
                                </form>
                                <div className="mul_ps">
                                    <p>批量开号时，账号名称生成为账号+范围数。</p>
                                    <span>例如：账号为name, 范围是从1-50，</span>
                                    <p>那么生成的批量账号则为<span>name1</span>,<span>name2</span>,<span>name3</span>...<span>name50</span></p>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>

        )
    }
}

export default Open;