import React, {Component} from 'react';
import './index.scss'
import { Layout, Modal, Select, DatePicker, Popconfirm, Pagination, message } from "antd";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import copy from 'copy-to-clipboard';
import axios from 'axios';

const { Content } = Layout;
const Option = Select.Option;
const {  RangePicker } = DatePicker;

function onChange(date, dateString) {
    console.log(date, dateString);
}

function handleChange(value) {
    console.log(`selected ${value}`);
}

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

class Arrange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible1:false,
            visible2:false,
            visible3:false,
            modify_name:"",
            modify_psw:"",
            modify_remark:"",
            passid:"",
            flag:false,
            count:0,
            refeenum:1,
            refeeindex:0,
            refeeprice:4,
            reprice:'',
            arr:[],
            refee:["4.00元/天","6.00元/周","10.00元/月"],
            list:[]
        };
    }

    componentDidMount(){
        this.getList();
    }

    getList(){
        axios.get(
            "http://localhost:3333/accountArrange"
        ).then( (res) => {
            if( res.data.code == 200 ){
                this.setState({ arr:res.data.data })
            }
        }).catch( (err) => {
            console.log(err)
        })
    }

    delete = (i) => {
        // var formData=new FormData();
        // formData.append("index",i);

        let data = { need:i };
        axios.post(
            "http://localhost:3333/delAccountArrange",
            data
        ).then( (res) => {
            if( res.data.code == 200 ){
                this.setState({arr:res.data.data});
            }
        }).catch( (err) => {
            console.log(err)
        })

        // const data = this.state.arr;
        // data.splice(id,1);
        // data.map(function(item,i){
        //     item.id = i;
        // });
        // this.setState({
        //     arr:data
        // })

    }

    modify = (index) => {
        const data = [...this.state.arr];
        let name = data[index].name;
        let psw = data[index].password;
        let remark = data[index].remark;
        console.log(name);
        this.setState({
            visible: true,
            passid:index,
            modify_name:name,
            modify_psw:psw,
            modify_remark:remark
        });
    }

    namecge = (e) => {
        this.setState({
            modify_name: e.target.value
        })
    }

    pswcge = (e) => {
        this.setState({
            modify_psw: e.target.value
        })
    }

    ttacge = (e) => {
        this.setState({
            modify_remark: e.target.value
        })
    }

    handleOk = () => {
        let pass = {
            index:this.state.passid,
            name:this.state.modify_name,
            psw:this.state.modify_psw,
            remark:this.state.modify_remark,
        };
        axios.post("http://localhost:3333/editAccountArrange", pass
        ).then( (res) =>{
            if( res.data.code == 200 ){
                this.setState({
                    arr:res.data.data,
                    visible: false
                });
            }
        }).catch( (err) =>{
            console.log(err)
        })

        // const data = [...this.state.arr];
        // let i = this.state.passid;
        // data[i].name = this.state.modify_name;
        // data[i].password = this.state.modify_psw;
        // data[i].remark = this.state.modify_remark;
        // this.setState({
        //     arr:data,
        //     visible: false,
        //     modify_name:'',
        //     modify_psw:'',
        //     modify_remark:''
        // });
        // document.getElementById("Mname").value = "";
        // document.getElementById("Mpsw").value = "";
        // document.getElementById("Mremark").value = "";
        // console.log(this.state.list);
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
            // modify_name:'',
            // modify_psw:'',
            // modify_remark:''
        });
        // document.getElementById("Mname").value = "";
        // document.getElementById("Mpsw").value = "";
        // document.getElementById("Mremark").value = ""
    }

    pickAll = () => {
        const data = [...this.state.arr];
        for(var i = 0; i < data.length; i++){
            if(this.state.flag == false){
                data[i].checks = true;
                this.state.count = data.length;
                this.state.list = data.concat()
            }else{
                data[i].checks = false;
                this.state.count = 0;
                this.state.list = []
            }
        }
        this.setState({
            arr:data,
            flag:!this.state.flag,
            count:this.state.count,
            list:this.state.list
        });
    }

    picked = (id) => {
        const data = [...this.state.arr];
        data[id].checks =! data[id].checks;
        if( data[id].checks){
            this.state.count++;
            this.state.list.push(data[id])
        }else{
            this.state.count--;
            console.log(id);
            this.state.list.pop()
        }
        if( this.state.count == data.length ){
            this.state.flag = true;
            this.state.list = data.concat();
        }else{
            this.state.flag = false;
        }
        this.setState({
            arr:data,
            count:this.state.count,
            flag:this.state.flag,
            list:this.state.list
        });
    }

    //导出
    educe = () => {
        if( this.state.count == 0 ){
            Modal.error({
                title: '提示信息',
                content: '请选择用户',
                okText:"确认"
            });
        }else{
            this.setState({
                visible1: true,
            });
        }
    }

    copyboard = () => {
        const data = [...this.state.list];
        var str = '';
        for( let i = 0; i < data.length; i++ ){
            var name = '账号：' + data[i].name;
            var psw = '密码：' + data[i].password;
            var num = '连接数：' + data[i].num;
            var date1 = '开户时间：' + data[i].date1;
            var date2 = '更新时间：' + data[i].date2;
            var date3 = '到期时间：' + data[i].date3;
            str += (name + psw + num + date1 + date2 + date3);
        }
        copy(str);
        message.success('复制成功！');
    }

    hideModal1 = () => {
        this.setState({
            visible1: false,
        });
    }

    //批量续费
    refees = () =>{
        if( this.state.count == 0 ){
            Modal.error({
                title: '提示信息',
                content: '请选择用户',
                okText:"确认"
            });
        }else{
            this.setState({
                visible2: true,
            });
        }
    }

    hideModal2 = () => {
        this.setState({
            visible2: false,
        });
    }

    refee = () => {
        this.setState({
            visible2: false,
        });
    }

    //批量续费 4 6 10元价格切换
    rechange = (index)=> {
        var price = "";
        if( index == 0 ){
            price = 4
        }else if( index == 1 ){
            price = 6
        }else{
            price = 10
        }
        var total = price * this.state.refeenum;
        this.setState({
            refeeindex:index,
            refeeprice:total,
            reprice:price
        })
    }

    // 批量续费 数量切换
    refeecge = (e) => {
        var value = e.target.value;
        var total = this.state.reprice * value;
        this.setState({
            refeeprice:total,
            refeenum:value
        })
    }

    // 批量续费 数量切换blur
    refeeblur = () => {
        if( this.state.refeenum == 0 || '' ){
            this.state.refeenum = 1;
        }
        this.setState({
            refeenum:this.state.refeenum
        })
    }

    //在线
    onlines = () => {
        if( this.state.count == 0 ){
            Modal.error({
                title: '提示信息',
                content: '请选择用户',
                okText:"确认"
            });
        }else{
            this.setState({
                visible3: true,
            });
        }
    }

    hideModal3 = () => {
        this.setState({
            visible3: false,
        });
    }

    render() {
        return (
            <Content style={{ margin: '0 16px' }}>
                <h2>账号管理</h2>
                <div className="select">
                    <input className="inp" type="text" placeholder="账户名" />
                    <Select
                        showSearch
                        style={{ width: 100,marginRight:"20px" }}
                        placeholder="类型"
                        optionFilterProp="children"
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="jack">测试</Option>
                        <Option value="lucy">付费</Option>
                    </Select>
                    <RangePicker onChange={onChange} locale={locale}/>
                    <label className="expire">
                        <input type="checkbox"/>即将到期
                    </label>
                    <a className="search" href="javascript:;">搜索</a>
                </div>
                {/*修改弹窗*/}
                <Modal
                    width="380px"
                    title="修改"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                >
                    <div className="modifybin">
                        <p className="mdfname">账户名</p>
                        <input onChange={this.namecge} type="text" id="Mname" value={this.state.modify_name}/>
                        <p className="mdfname">密码</p>
                        <input onChange={this.pswcge} type="text" id="Mpsw" value={this.state.modify_psw}/>
                        <p className="mdfname">备注</p>
                        <textarea onChange={this.ttacge} name="" id="Mremark" value={this.state.modify_remark}></textarea>
                    </div>
                </Modal>
                {/*导出弹窗*/}
                <Modal
                    className="educeBin"
                    title="文本信息"
                    visible={this.state.visible1}
                    onOk={this.copyboard}
                    onCancel={this.hideModal1}
                    okText="复制"
                    cancelText="确认"
                >
                    {
                        this.state.list.map( (item,index) => {
                            return (
                                <div className="educebox" key={index}>
                                    <p>账户：{item.name}</p>
                                    <p>密码：{item.password}</p>
                                    <p>连接数：{item.num}</p>
                                    <p>开户时间：{item.date1}</p>
                                    <p>更新时间：{item.date2}</p>
                                    <p>到期时间：{item.date3}</p>
                                </div>
                            )
                        })
                    }
                </Modal>
                {/*批量续费弹窗*/}
                <Modal
                    className="refeeBin"
                    title="批量续费"
                    visible={this.state.visible2}
                    onOk={this.refee}
                    onCancel={this.hideModal2}
                    okText="续费"
                    cancelText="取消"
                >
                    <div className="refeebox">
                        <p className="refeenames">续费账户：</p>
                        {
                            this.state.list.map( (item,index) => {
                                return (
                                    <span key={index} className="retitle">{item.name + "，"}</span>
                                )
                            })
                        }
                        <div className="refeemain">
                            <input type="number" onBlur={this.refeeblur} onChange={this.refeecge} defaultValue={this.state.refeenum} />
                            {
                                this.state.refee.map( (item,index) => {
                                    return (
                                        <div key={index} className="refeecabins" onClick={this.rechange.bind(this,index)}>
                                            <i className={ index == this.state.refeeindex ? "refeepick" : "" }></i>
                                            <span>{item}</span>
                                        </div>
                                    )
                                } )
                            }
                            <div className="amount">
                                <p>总价：<span>￥</span><span>{this.state.refeeprice}</span></p>
                            </div>
                        </div>
                    </div>
                </Modal>
                {/*在线弹窗*/}
                <Modal
                    className="onlineBin"
                    title="在线信息"
                    visible={this.state.visible3}
                    onOk={this.hideModal3}
                    onCancel={this.hideModal3}
                    okText="确认"
                    cancelText="取消"
                >
                    <ul>
                        <li>账号名</li>
                        <li>连接地区</li>
                        <li>在线时长</li>
                        <li>操作</li>
                    </ul>
                    {
                        this.state.list.map( (item,index) => {
                            return (
                                <div className="onlinebox" key={index}>
                                    <p>
                                        <span>{item.name}</span>
                                        <span>{item.address}</span>
                                        <span>{item.hour}</span>
                                        <a href="javascript:;">下线</a>
                                    </p>
                                </div>
                            )
                        })
                    }
                </Modal>
                <div className="arrbox">
                    <div className="operate">
                        <a href="javascript:;" className="educe" onClick={this.educe}>导出</a>
                        <a href="javascript:;" className="readd" onClick={this.refees}>续费</a>
                        <a href="javascript:;" className="online" onClick={this.onlines}>在线</a>
                    </div>
                    <table>
                        <thead>
                        <tr>
                            <th onClick={this.pickAll} style={{cursor:"pointer"}}>
                                <span
                                    style={{width:"16px",height:"16px",border:'1px solid #ccc',display:"inline-block"}}
                                    className={ this.state.flag == true ? "checkAll" : "checkNone" }>
                                </span>
                            </th>
                            <th>账户名</th>
                            <th>密码</th>
                            <th>可用余额</th>
                            <th>类型</th>
                            <th>连接数</th>
                            <th>时间</th>
                            <th>状态</th>
                            <th>备注</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.arr.map( (item,index) => {
                                return (
                                    <tr key={item.id} className={ item.status == 0 ? "bg_normal" : item.status == 1 ? "bg_soon" : "bg_done" }>
                                        <td style={{width:"50px",cursor:"pointer"}} onClick={this.picked.bind(this,item.id)}>
                                            <span style={{width:"16px",height:"16px",border:'1px solid #ccc',display:"inline-block"}} className={ item.checks == true ? 'active': 'none' }></span>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.password}</td>
                                        <td>{item.sur}</td>
                                        <td>{item.sty}</td>
                                        <td>{item.num}</td>
                                        <td style={{width:"250px",padding:"10px 0"}}>
                                            <p>开户时间：{item.date1}</p>
                                            <p>更新时间：{item.date2}</p>
                                            <p>到期时间：{item.date3}</p>
                                        </td>
                                        <td className="status">
                                            <span className={ item.status == 0 ? "normal" : item.status == 1 ? "soon" : "done" }>{item.ps}</span>
                                        </td>
                                        <td>{item.remark}</td>
                                        <td style={{width:"140px"}}>
                                            <a href="javascript:;" onClick={this.modify.bind(this,index)}>修改</a>
                                            <Popconfirm title="确定删除吗？" okText="删除" cancelText="取消" onConfirm={this.delete.bind(this,index)}>
                                                <a href="javascript:;">退款</a>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <div className="pages">
                        <Pagination defaultCurrent={1} total={10} />
                    </div>
                </div>
            </Content>
        );
    }
}

export default Arrange;
