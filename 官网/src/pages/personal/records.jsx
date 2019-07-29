import React, { Component } from 'react';
import Pages from "@/components/pages"
import { Card, Table, Select, Form, Button } from "antd";
import QueueAnim from 'rc-queue-anim';
import axios from "@/common/axios"
import moment from "moment"

const FormItem = Form.Item;
const Option = Select.Option;
class Records extends Component {
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
                {
                    title: "交易号",
                    dataIndex: "orderNo",
                    width:280,
                    key: "orderNo"
                },
                {
                    title: "支付时间",
                    dataIndex: "createAt",
                    key: "createAt",
                    render: (text) => <span>
                    {text?moment(text*1000).format("YYYY-MM-DD  HH:mm:ss"):""}
                    </span>
                },
                {
                    title: "vip等级",
                    dataIndex: "vipLevel",
                    key: "vipLevel"
                },
                {
                    title: "充值金额（元）",
                    dataIndex: "rechargeAmount",
                    key: "rechargeAmount"
                },
                {
                    title: "赠送金额（元）",
                    dataIndex: "donationAmount",
                    key: "donationAmount"
                },
                {
                    title: "实际充值（元）",
                    dataIndex: "actualAmount",
                    key: "actualAmount"
                },
            ],
            loading:false,
            pageParams:{
                page:1,
                pageSize:10,
                total:0
            },
            dataList:[
                {id:1,name:"商品1"}
            ]
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
            method:"post",
            url: "/rechargeRecord/mlist",
            data:this.state.pageParams
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
    
    render() {
        const {dataList, loading, columns, pageParams} = this.state;
        return(
            // <QueueAnim type="scale" delay={100}> 
                <Card title="充值记录" key="Records">
                    {/* <Form layout="inline">
                        <FormItem
                            label="购买记录" 
                            >
                                {getFieldDecorator("time",{
                                    initialValue : "1"
                                })(
                                    <Select style={{width:150}} optionFilterProp="children" showSearch allowClear={false}  placeholder="请选择已购买的套餐">
                                    {timeOptions.map((key, index) => (
                                    <Option value={key.id} key={key.id}>
                                        {key.name}
                                    </Option>
                                    ))}
                                </Select>
                                )}
                        </FormItem>
                        <FormItem> <Button type="primary"> 立即查询 </Button> </FormItem>
                    </Form> */}
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
export default Form.create()( Records );