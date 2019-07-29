import React, { Component } from 'react';
import Pages from "@/components/pages"
import { Card, Table, Select, Form, Button, Input } from "antd";
import QueueAnim from 'rc-queue-anim';
import axios from "@/common/axios"
import moment from "moment"
const FormItem = Form.Item;
const Option = Select.Option;
class Use extends Component {
    constructor(props) {
        super(props);
        this.state = {    
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
                // {
                //     title: "使用Ip",
                //     dataIndex: "ip",
                //     key: "ip"
                // },
                // {
                //     title: "端口号",
                //     dataIndex: "port",
                //     key: "port"
                // },
                // {
                //     title: "提交参数",
                //     dataIndex: "param",
                //     key: "param"
                // },
                {
                    title: "协议类型",
                    dataIndex: "protocol",
                    key: "protocol",
                    render: (text) => <span>{["http","s5"][text-1]} </span>
                },
                {
                    title: "提取方式",
                    dataIndex: "extractType",
                    key: "extractType",
                    render: (text) => <span>{["按次提取","套餐提取"][text-1]} </span>
                },
                {
                    title: "提取数量",
                    dataIndex: "count",
                    key: "count"
                },
                {
                    title: "提取IP时间",
                    dataIndex: "createAt",
                    key: "createAt",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD  HH:mm:ss"):""}
                    </span>
                },
                // {
                //     title: "IP所属地",
                //     dataIndex: "name",
                //     key: "name"
                // },
                // {
                //     title: "登录时间",
                //     dataIndex: "num",
                //     key: "num"
                // },
                // {
                //     title: "登出时间",
                //     dataIndex: "money",
                //     key: "money"
                // },
                // {
                //     title: "登录时长",
                //     dataIndex: "time",
                //     key: "time"
                // },
            ],
            loading:false,
            pageParams:{
                page:1,
                pageSize:10,
                total:0
            },
            dataList:[],
        }
    }
    componentWillMount(){}
    componentDidMount() {
        this.getTabeData()
    }
    componentWillReceiveProps (newValue){}
    getParamsPage=(value)=>{
        this.setState({"pageParams":value},()=>{this.getTabeData()})
    }
    getTabeData=()=>{
        axios({
            method:"get",
            // url: "/extract/history/list",
            url: "/api/history/list/current",
            params: this.props.form.getFieldValue("ip") ? 
                {...this.state.pageParams,...this.props.form.getFieldsValue()}
                :this.state.pageParams
        }).then((res)=>{
            if(res.code !== 0 ) return;
            const { total, data } = res.data;
            let pageParams =  Object.assign({}, this.state.pageParams, { total: total })
            this.setState({
                dataList:data,
                pageParams
            })
            
        })
    }
    searchData(){
        let pageParams = Object.assign({},this.state.pageParams);
        pageParams.page=  1;
        this.setState({pageParams},()=>{this.getTabeData()})
    }
    render() {
        const {dataList, loading, columns, pageParams} = this.state;
        const { getFieldDecorator } = this.props.form;
        return(
            // <QueueAnim type="scale" delay={100}> 
                <Card title="使用记录" key="Use">
                    <Form layout="inline">
                        <FormItem>
                            {getFieldDecorator('ip')(
                                <Input  placeholder="请输入IP地址" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" icon="search" onClick={()=>this.searchData()}>
                                查询
                            </Button>
                        </FormItem>
                    </Form>
                    <Table
                        columns={columns}
                        bordered={true}
                        dataSource={dataList}
                        rowKey={row => row.id}
                        style={{marginTop:20}}
                        loading={loading}
                        pagination={false}
                    />
                    <Pages pageParams={ pageParams } getParamsPage={this.getParamsPage.bind(this)}/>
                </Card>
            // </QueueAnim>
        )
    }
}
export default Form.create()( Use );