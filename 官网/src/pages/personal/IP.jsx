import React, { Component } from 'react';
import { Card, Button, Modal, Input, Icon, Form, notification, Table} from "antd";
import QueueAnim from 'rc-queue-anim';
import Pages from "@/components/pages";
import { withRouter } from "react-router-dom";
import moment from "moment"
import axios from "@/common/axios"
const FormItem = Form.Item;

class IP extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageParams:{
                pageSize:10,
                page:1,
                total:0
            },
            visibleTitle:false,
            visible:false,
            titile:'',
            columns:[
                {
                    title: '序号',
                    key: 'index',
                    align:"center",
                    width: 70,
                    render: (text,data,index) => <span>{index+1}</span>,
                },
                {
                    title: 'IP地址',
                    dataIndex: 'ip',
                    key: 'ip',
                    // render: (text) => <span>{text?moment(text*1000).format("YYYY-MM-DD"):""}</span>
                },
                {
                    title: '创建时间',
                    dataIndex: 'createAt',
                    key: 'createAt',
                    render: (text) => <span>{text?moment(text*1000).format("YYYY-MM-DD  HH:mm:ss"):""}</span>
                },
                {
                    title: '更新时间',
                    dataIndex: 'updateAt',
                    key: 'updateAt',
                    render: (text) => <span>{text?moment(text*1000).format("YYYY-MM-DD  HH:mm:ss"):""}</span>
                },
                {
                    title: '状态',
                    dataIndex: 'lock',
                    key: 'lock',
                    render: (text) => <span>{ text?"锁定":"未锁定"}</span>
                },
                {
                    title: '操作',
                    dataIndex: 'option',
                    key: 'option',
                    width:160,
                    render: (text,rowKey,index) => <Button.Group>
                        <Button type="primary" onClick={()=>this.lockChange(rowKey.id,rowKey.lock)}>{rowKey.lock ?"开启":"锁定"}</Button>
                        <Button type="primary" onClick={()=>this.deleteChange(rowKey.id)}>删除</Button> 
                    </Button.Group>
                }
            ]
        }
    }
    componentWillMount(){}
    componentDidMount() {
       this.getTabeData()
    }
    getParamsPage=(value)=>{
        this.setState({"pageParams":value},()=>{this.getTabeData()})
    }
    getTabeData=()=>{
        axios({
            method:"get",
            url: "whitelist/list",
            params:this.state.pageParams
        }).then((res)=>{
            if(res.code !== 0 ) return;
            const { total, data } = res.data;
            let pageParams =  Object.assign({}, this.state.pageParams, { total: total })
            this.setState({
                dataSource:data,
                pageParams
            })
            
        })
    }
    addIp(){
        this.setState({visible:true})
        
    }
    closeModal(){
        this.setState({visible:false})
    }
    closeTitle(){
        this.setState({visibleTitle:false})
    }
    handleSubmit(){
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(err) return;
            axios({
                method:"post",
                url: "whitelist",
                data:values 
            }).then((res)=>{
                if(res.code !== 0 ) return;
                notification.success({
                    message: '提示',
                    description: "新增白名单成功！",
                    duration : 2
                  })
                this.setState({visible:false})
                this.getTabeData()
            })
        })
        
    }
    deleteChange(id){
        axios({
            method:"delete",
            url: `whitelist/delete/${id}`, 
        }).then((res)=>{
            if(res.code !== 0 ) return;
            notification.success({
                message: '提示',
                description: "删除白名单成功！",
                duration : 2
                })
            this.getTabeData()
        })
    }
    lockChange(id,type){
        axios({
            method:"put",
            url: `whitelist/${type?"unlock":"lock"}/${id}`, 
        }).then((res)=>{
            if(res.code !== 0 ) return;
            notification.success({
                message: '提示',
                description: `${type ?"开启":"关闭"}成功！`,
                duration : 2
            })
            this.getTabeData()
        })
    }
    download = (name,url )=>{
        axios({
            method:'get',
            url: url
        }).then((data)=>{
            // let fileName = `${name}.xlsx`;
            // let blob = new Blob([data.data],{type:'application/x-msdownload'});
            // let objectUrl = URL.createObjectURL(blob);
            // var a = document.createElement('a');
            // a.href = objectUrl
            // a.download = fileName
            // a.click()
            // a.remove()
            if(data.code!==0) return;
            this.setState({visibleTitle:true,title:name,dataTitle:data.data})
        })
    }
    
    componentWillReceiveProps (newValue){}
    render() {
        const { getFieldDecorator } = this.props.form;
        const { pageParams, visible,dataSource, columns, dataTitle, title, visibleTitle } = this.state;
        return(
            
            // <QueueAnim type="scale" delay={100}> 
                <Card title="IP白名单"  key="IP" extra={<Button type="primary" onClick={this.addIp.bind(this)}>新增</Button>}>
                <a target="_blank" onClick={()=>this.download("获取白名单列表接口","/whitelist/link/list")} style={{marginRight:20}}>获取白名单列表接口</a>
                <a target="_blank" onClick={()=>this.download("获取添加白名单接口","/whitelist/link/add")} style={{marginRight:20}}>获取添加白名单接口</a>
                <a target="_blank" onClick={()=>this.download("获取删除白名单接口","/whitelist/link/del")}>获取删除白名单接口</a>
                <Table
                    style={{margin:"20px 0"}}
                    dataSource={dataSource} 
                    columns={columns}
                    pagination={false}
                    rowKey = {(records,index)=>{return index}}
                    bordered/>
                    <Pages pageParams={ pageParams } getParamsPage={this.getParamsPage.bind(this)}/>
                    <Modal
                        title="新增IP地址"
                        width="300px"
                        destroyOnClose={true}
                        footer={null}
                        onCancel ={this.closeModal.bind(this)}
                        visible={visible}
                    >
                       <Form>
                            <FormItem>
                            {getFieldDecorator('ip', {
                                rules: [{ required: true, message: '请输入IP白名单' }],
                            })(
                                <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入IP地址" />
                            )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" block  onClick={this.handleSubmit.bind(this)}>
                                确定
                                </Button>
                            </FormItem>
                        </Form>
                    </Modal>
                    <Modal
                        title={title}
                        width="80%"
                        destroyOnClose={true}
                        footer={null}
                        onCancel ={this.closeTitle.bind(this)}
                        visible={visibleTitle}
                    >
                       <p>{dataTitle}</p>
                    </Modal>
                </Card>

            // </QueueAnim>
        )
    }
}
export default withRouter(Form.create()(IP))