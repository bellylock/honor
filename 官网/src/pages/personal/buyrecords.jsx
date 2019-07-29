import React, { Component } from 'react';
import { Card, Table } from "antd";
import QueueAnim from 'rc-queue-anim';
import axios from "@/common/axios";
import moment from "moment";
class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                // {
                //     title: "api调用频率(s)",
                //     dataIndex: "apiCallFrequency",
                //     key: "apiCallFrequency"
                // },
                {
                    title: "购买时间",
                    dataIndex: "createAt",
                    key: "createAt",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD"):""}
                    </span>
                },
                {
                    title: "开始时间",
                    dataIndex: "startTimes",
                    key: "startTimes",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD"):""}
                    </span>
                },
                {
                    title: "截止时间",
                    dataIndex: "deadline",
                    key: "deadline",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD"):""}
                    </span>
                },
                {
                    title: "每天使用上限",
                    dataIndex: "ipLimitPerDay",
                    key: "ipLimitPerDay"
                },
                {
                    title: "今日剩余量",
                    dataIndex: "remaining",
                    key: "remaining"
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
                    title: "金额(元)",
                    dataIndex: "amount",
                    key: "amount"
                }
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
                // {
                //     title: "套餐名",
                //     dataIndex: "name",
                //     key: "name"
                // },
                // {
                //     title: "类型",
                //     dataIndex: "type",
                //     key: "type",
                //     render:(text)=>
                //         <span>{["按周购买","按月购买","按季度购买"][text-1]}</span>

                // },
                // {
                //     title: "价格(元)",
                //     dataIndex: "price",
                //     key: "price"
                // },
                {
                    title: "开始时间",
                    dataIndex: "startTime",
                    key: "startTime",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD"):""}
                    </span>
                },
                {
                    title: "截止时间",
                    dataIndex: "deadline",
                    key: "deadline",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD"):""}
                    </span>
                },
                {
                    title: "链接数",
                    dataIndex: "connections",
                    key: "connections"
                },
                {
                    title: "金额(元)",
                    dataIndex: "amount",
                    key: "amount"
                }
            ],
            dataSource:[],
            dataSource1:[]
        }
    }
    componentWillMount(){}
    componentDidMount() {
        this.getData()
    }
    getData(){
        axios({
            method:"get",
            url:"ip/ppg/user/current"
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            this.setState({dataSource:iData.data})
        })
    }
    getData1(){
        axios({
            method:"get",
            url:"/vpn/current"
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            this.setState({dataSource1:iData.data})
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
    componentWillReceiveProps (newValue){}
    render() {
        const { dataSource1,columns1, columns, dataSource,tabListNoTitle,noTitleKey } = this.state;
        return(
            // <QueueAnim type="scale" delay={100}> 
                <Card style={{ margin :"10px 50px" }}
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
                </Card>
            // </QueueAnim>
        )
    }
}
export default Buy ;