import React, { Component } from 'react';
import { Card, Table, Button, notification, Modal, Select, InputNumber, Form } from "antd";
import QueueAnim from 'rc-queue-anim';
import axios from "@/common/axios";
import moment from "moment";
import {observer,inject } from "mobx-react";
const FormItem = Form.Item;
const Option = Select.Option;
@inject(['store'])
@observer
class Buy extends Component {
    constructor(props) {
        super(props);
        this.id = '';
        this.optionsPrice=[{
            id:0,
            name:'一天'
        },{
            id:1,
            name:'一周'
        },{
            id:2,
            name:'一月'
        }];
        this.state = {
            dataSource:[],
            dataSource1:[],
            tabListNoTitle : [
                {
                    key:1,
                    tab:"IP套餐"
                },
                {
                    key:2,
                    tab:"vpn套餐"
                },
            ],
            visible:false,
            noTitleKey:'1',
            columns:[
                {
                    title: "序号",
                    key: "indexs",
                    width:70,
                    align:"center",
                    render: (indexs,records,index) => (
                        <span>{index+1}</span>
                    )
                },
                {
                    title: "套餐名",
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: "单次最大IP数量",
                    dataIndex: "maximumIp",
                    key: "maximumIp"
                },
                {
                    title: "api调用频率(s)",
                    dataIndex: "apiCallFrequency",
                    key: "apiCallFrequency"
                },
                // {
                //     title: "购买时间",
                //     dataIndex: "createAt",
                //     key: "createAt",
                //     render: (text) => <span>
                //     {text?moment(text*1000).format("YYYY-MM-DD"):""}
                //     </span>
                // },
                {
                    title: "每天使用上限",
                    dataIndex: "ipLimitPerDay",
                    key: "ipLimitPerDay"
                },
                {
                    title: "稳定时长最小（分钟）",
                    dataIndex: "minDuration",
                    key: "minDuration"
                },
                {
                    title: "稳定时长最大（分钟）",
                    dataIndex: "maxDuration",
                    key: "maxDuration"
                },
                {
                    title: '操作',
                    dataIndex: 'option',
                    key: 'option',
                    width:160,
                    render: (text,rowKey,index) => <Button.Group>
                        <Button type="primary" onClick={()=>this.buy(rowKey.id)}>购买</Button> 
                    </Button.Group>
                },
            ],
            columns1:[
                {
                    title: "序号",
                    key: "indexs",
                    width:70,
                    align:"center",
                    render: (indexs,records,index) => (
                        <span>{index+1}</span>
                    )
                },
                {
                    title: "套餐名",
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: "类型",
                    dataIndex: "type",
                    key: "type",
                    render:(text)=>
                        <span>{["按周购买","按月购买","按季度购买"][text-1]}</span>
                },
                {
                    title: "价格（元）",
                    dataIndex: "price",
                    key: "price"
                },
                {
                    title: "链接数",
                    dataIndex: "connections",
                    key: "connections",
                    render:(text,records,index)=>
                    <InputNumber  min={1}
                                step ={1}
                                max={50}
                                precision={0}
                                value ={text}
                                onChange={this.changeConnections.bind(this,index)}
                            />
                },
                {
                    title: '操作',
                    dataIndex: 'option',
                    key: 'option',
                    width:160,
                    render: (text,rowKey,index) => <Button.Group>
                        <Button type="primary" onClick={()=>this.buyVpn(rowKey.id,rowKey.connections)}>购买</Button> 
                    </Button.Group>
                },
            ]
        }
    }
    componentWillMount(){}
    componentDidMount() {
        this.getData()
    }
    getData(){
        axios({
            method:"get",
            url:"/ip/ppg/list",
            params:{
                type:1
            }
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            this.setState({dataSource:iData.data})
        })
    }
    getData1(){
        axios({
            method:"get",
            url:"/vpnPpg/list",
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            iData.data.data.forEach((item)=>
                item.connections = 1
            )
            this.setState({dataSource1:iData.data.data})
        })
    }
    buy(id){
        this.setState({visible:true});
        this.id = id
    }
    
    buyVpn(id,connections){
        axios({
            method:"get",
            url:"/vpn/purchase",
            params:{
                vpnPpgId:id,
                connections
            }
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            this.getInfo()
            notification.success({
                message: '提示',
                description: "购买vpn套餐成功！",
                duration : 2
            })
        })

    }
    getInfo(){
        axios({
            method:"post",
            url:"/user/info"
        }).then((data)=>{
            if(data.code !== 0) return;
            const { username, balance, vipLevel } = data.data;
            this.props.store.changeUserInfo({username, balance, vipLevel});
        })
    }
    onTabChange(key){
        this.setState({noTitleKey:key})
        switch(key){
            case "1":
            this.getData();break;
            case "2":
            this.getData1()
            break;
            default: break;
        }
    }
    closeModal(){
        this.setState({visible:false});
    }
    changeConnections(index,value){
        if( typeof value !=="number") return;
        let arr = Object.assign([],this.state.dataSource1);
        arr[index].connections = value
        this.setState({dataSource1:arr})
    }
    handleSubmit(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            axios({
                method:"post",
                url:"/user/ip/ppg",
                data:{ ...values,
                    id:this.id
                }
            }).then((iData)=>{
                if(iData.code !==0 ) return;
                this.getInfo();
                this.setState({visible:false});
                notification.success({
                    message: '提示',
                    description: "购买套餐成功！",
                    duration : 2
                })
            })
        })
        
    }
    changeTime(){

    }
    onBlur(){
        let value = this.props.form.getFieldValue('ipLimitPerDay');
        if(typeof value === 'number' && !isNaN(value))
            this.props.form.setFieldsValue({ipLimitPerDay:Math.ceil(this.props.form.getFieldValue('ipLimitPerDay')/1000)*1000}) 
    }
    changeNum(){

    }
    componentWillReceiveProps (newValue){}
    render() {
        const {dataSource1,columns1, columns, dataSource,tabListNoTitle,noTitleKey,visible } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 7 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 12 },
            },
          };
        return(
            <Card
                style={{ margin :"10px 50px" }}
                tabList={tabListNoTitle}
                activeTabKey={noTitleKey}
                onTabChange={(key) => { this.onTabChange(key); }}
            >
                    { noTitleKey==="1"?
                    <Table
                        style={{margin:"20px 0"}}
                        dataSource={dataSource} 
                        columns={columns}
                        pagination={false}
                        rowKey = {(records,index)=>{return index}}
                        bordered/>:
                        <Table
                        style={{margin:"20px 0"}}
                        dataSource={dataSource1} 
                        columns={columns1}
                        pagination={false}
                        rowKey = {(records,index)=>{return index}}
                        bordered/>}
            <Modal
                title="购买套餐"
                width="300px"
                destroyOnClose={true}
                footer={null}
                onCancel ={this.closeModal.bind(this)}
                visible={visible}
            >
                <Form>
                    <FormItem label="购买时长" {...formItemLayout}>
                    {getFieldDecorator('type', {
                        initialValue:0,
                        rules: [{ required: true, message: '请选择购买时长' }],
                    })(
                        <Select
                        placeholder="请选择购买时长"
                        style={{width:88}}
                        onChange={this.changeTime.bind(this)}>
                    {
                        this.optionsPrice.map(itemPrice=>
                            <Option
                            value={itemPrice.id}
                            key={itemPrice.id}>
                            {itemPrice.name}
                        </Option>)
                    }
                    </Select>
                    )}
                    </FormItem>
                    <FormItem label="每日数量"  {...formItemLayout}>
                    {getFieldDecorator('ipLimitPerDay', {
                        initialValue:1000,
                        rules: [{ required: true, message: '请输入每日数量' }],
                    })(
                        <InputNumber min={1000}
                            step ={1000}
                            onBlur = {this.onBlur.bind(this)}
                            max={100000}
                            onChange={this.changeNum.bind(this)}/>
                    )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" block  onClick={this.handleSubmit.bind(this)}>
                        确定
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
            </Card>
        )
    }
}
export default Form.create()(Buy);