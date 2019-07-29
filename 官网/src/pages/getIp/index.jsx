import React, { Component } from 'react';
import {notification,Carousel, Card , Form, Select, Button, Slider, InputNumber, Row, Col, Radio, Input, Tag, List, Cascader, Checkbox} from "antd";
import Carousels from "@/components/carousel";
import axios from "@/common/axios"
import "./index.styl"
import cookie from 'react-cookies';
const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const CheckboxGroup = Checkbox.Group;

class GetIp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgeArr : [require("@/img/home1.png"), require("@/img/home2.jpg")],
            taocanOptions:[],
            listData:[
                "* 生成API链接，调用HTTP GET请求即可返回所需的IP结果",
                "* 可以直接按照以下格式组装的API链接:",
                "http://47.101.163.205:8082/generate/api/json?type=0&packid=1&port=1&qty=10&ss=1&minRepeatDay=0&pro=&city="
                // "* 添加白名单接口:",
                // "http://pc.bitdaili.com/Users-whiteIpAddNew.html?appid=XX&appkey=XX&whiteip=您的ip"
            ],
            url:"",
            apiOptions:[
                {key:"qty",value:"获取IP数量"},
                {key:"pro",value:"代表省份"},
                {key:"city",value:"城市"},
                {key:"port",value:"代理协议（1:HTTP/HTTPS 2:Sockss）"},
                {key:"type",value:"提取方式（1:按次提取 2:套餐提取）"},
                {key:"packid",value:"用户套餐ID"},
                {key:"minRepeatDay",value:"IP去重(0:不去重 1:当天)"},
                // {key:"et",value:"是否显示IP过期时间（1显示 2不显示）"},
                // {key:"pi",value:"是否显示IP位置信息（1显示 2不显示）"},
                // {key:"co",value:"是否显示IP运营商（1显示 2不显示）"},
                {key:"ss",value:"分隔符(1:\\r\\n 2:\\r 3:\\n 4:\\t 5:<br>)"},
                // {key:"css",value:"自定义分隔符"}
            ],
            resOptions:[
                {key:"code",value:"0为成功，其他为失败"},
                {key:"httpPort",value:"端口"},
                {key:"remoteIp",value:"IP地址"},
                {key:"availableTime",value:"可用时长"}
            ],
            areaOptions:[],
            plainOptions: [],                                                                              
            resHtml:'{"msg":"操作成功","code":0,"data":[{"remoteIp":"111.76.111.135","httpPort":"14973","availableTime":-1}]}',
            city:"",
            pro:[],
            timeOptions:[],
            time:0
        }
    }
    componentWillMount(){}
    componentDidMount() {
        if(cookie.load("httpipId")){
            axios({
                method:"get",
                url:"/ip/ppg/user/current/distinct"
            }).then((iData)=>{
                if(iData.code !==0 ) return;
                if(iData.data[0])
                    this.setState({taocanOptions:[{
                        id:1,
                        name:"按次提取",
                    },
                    {
                        id:2,
                        name:"套餐提取",
                    }]})
                else
                    this.setState({taocanOptions:[{
                        id:1,
                        name:"按次提取",
                    }]})
            })
            this.props.form.setFieldsValue({minutes:1})
            this.getoneCurrent()
            // this.getCurrent()
        }
        this.getAreas()
        
    }

    componentWillReceiveProps (newValue){}
    //改变数量
    changeNum(value){
        if(typeof value == "number")
            this.props.form.setFieldsValue({qty:value})
    }
    //生成url
    createUrl(){
        if(!cookie.load("httpipId"))
            return notification.warning({
                message: '提示',
                description: "请先登录！",
                duration : 2
            })
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err)  return;
            const { minutes, format, protocol, qty, ss, time ,minRepeatDay } = values;
           
            this.setState({url:`${process.env.REACT_APP_URL}/generate/api/${format}?type=${minutes}&packid=${time}&port=${protocol}&qty=${qty}&ss=${ss}&${this.state.city?`city=${this.state.city}&`:""}${JSON.stringify(this.state.pro)!=="[]"?`pro=${this.state.pro.toString()}&`:""}minRepeatDay=${minRepeatDay}`})  
        });
    }
    //复制url
    copyUrl(){
        let url = document.getElementById("copyUrl")
        url.select(); 
        document.execCommand("Copy")
    }
    //打开链接
    openUrl(){
        window.open(this.state.url); 
    }
    //获取套餐内容
    getoneCurrent(){
        axios({
            method:"get",
            url:"/ip/ppv/list"
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            // iData.data.unshift({
            //     id:0,
            //     name:"按次购买"
            // })
            if(iData.data[0])
                this.props.form.setFieldsValue({time:iData.data[0].id})
            this.setState({timeOptions:iData.data})
        })
    }
    getCurrent(){
        axios({
            method:"get",
            url:"/ip/ppg/user/current/distinct"
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            // iData.data.unshift({
            //     id:0,
            //     name:"按次购买"
            // })
            if(iData.data[0])
                this.props.form.setFieldsValue({time:iData.data[0].ipPpgId})
            else this.props.form.setFieldsValue({time:null})

            this.setState({timeOptions:iData.data})
        })
    }
    //获取省市区
    getAreas(){
        axios({
            method:"get",
            url:"/all/areas"
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            // this.setState({taocanOptions:iData.data})
            // iData.data
            let plainArr = [];
            iData.data.map((item)=>{
                plainArr.push({
                    label:item.name,
                    value:item.id
                })
            })
            this.setState({plainOptions:plainArr,areaOptions:iData.data})
        })  
    }
    //改变类型
    changeMinutes(value){
           console.log(value)
           if(value===1){
               this.getoneCurrent()
           }
           else if(value===2){
                this.getCurrent()
           }else{
                this.props.form.setFieldsValue({time:null})
                this.setState({timeOptions:[]})
           }
    }
    getCity(val){
        this.setState({city:val[1]||''})
    }
    ChangeCityType(e){
        if(e.target.value==1){
            this.setState({pro:[]})
        }else
            this.setState({city:""})
    }
    ChangePro(val){
        this.setState({pro:val})
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
            },
        };
        const { getFieldDecorator,getFieldValue } = this.props.form;
        const marks ={
            1:'1',
            100:'100',
            200:'200'
        }
        const { listData, imgeArr, url, taocanOptions, apiOptions, resOptions, resHtml,areaOptions, plainOptions,timeOptions} = this.state;
        const form = this.props.form;
        return(
            <div>
                <Carousel autoplay effect="fade">
                    <div key={1} style={{position:"relative"}}>
                        <img src={require("@/img/home2.jpg")} style={{width:"100%"}}/>
                        <div style={{position:"absolute",top:"80px",left:"30%",textAlign:"center"}}>
                            <p style={{fontSize:"40px",color:"#4c4c4c"}}>最新高速的HTTP代理IP</p>
                            <p style={{fontSize:"32px",color:"#4c4c4c"}}> 
                                <strong>海量高匿IP，契合您的业务需求，一键提取</strong>
                            </p>
                        </div>
                    
                    </div>
                </Carousel>
                <div style={{width:"900px",margin:" 0 auto"}}>
               <Card title="提取IP/生成IP" style={{margin :"10px 50px"}}>
               <Form>
                    <FormItem
                        label="套餐选择" 
                        {...formItemLayout}
                        >
                            {getFieldDecorator("minutes",{
                                rules: [{
                                    required: true, message: '请选择已购买的套餐',
                                }]
                            })(
                                <Select optionFilterProp="children" showSearch allowClear onChange={ this.changeMinutes.bind(this) }  placeholder="请选择已购买的套餐">
                                 {taocanOptions.map((key, index) => (
                                   <Option value={key.id} key={key.id}>
                                     {key.name}
                                   </Option>
                                 ))}
                               </Select>
                            )}
                    </FormItem>
                    <FormItem
                        label="提取数量"
                        {...formItemLayout}
                        >
                        <Row gutter={16}>
                            <Col span={20}>
                                {getFieldDecorator("qty",{
                                    initialValue:10,
                                    rules: [{
                                        required: true, message: '请选择填写数量',
                                    }]
                                })(
                                        
                                    <Slider min={1} max={200} marks={marks}/>   
                                
                                )}
                            </Col>
                            <Col span={4}>
                                <InputNumber min={1} max={200} precision={0} value={form.getFieldValue("qty")} onChange={this.changeNum.bind(this)} />
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        label="代理协议"
                        {...formItemLayout}
                        >
                            {getFieldDecorator("protocol",{
                                initialValue:1,
                                rules: [{
                                    required: true, message: '请选择代理协议',
                                }]
                            })(
                                <RadioGroup>
                                    <Radio value={1}>HTTP/HTTPs</Radio>
                                    <Radio value={2}>SOCKSS</Radio>
                                    {/* <Radio value={3}>VPN</Radio> */}
                                </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem
                        label="稳定使用时长"
                        {...formItemLayout}
                        >
                            {getFieldDecorator("time",{
                                initialValue:this.state.time,
                                rules: [{
                                    required: true, message: '请选择稳定使用时长'
                                }]
                            })(
                                <RadioGroup>
                                    {
                                        timeOptions.map((key)=>{
                                            return  <Radio value={key.ipPpgId||key.id} key={key.ipPpgId||key.id}>
                                            {key.name}</Radio>
                                        })
                                    }
                                </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem
                        label="IP去重"
                        {...formItemLayout}
                        >
                            {getFieldDecorator("minRepeatDay",{
                                initialValue:0,
                                rules: [{
                                    required: true, message: '请选择IP去重',
                                }]
                            })(
                                <RadioGroup>
                                    <Radio value={0}>不去重</Radio>
                                    <Radio value={1}>当天</Radio>
                                </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem
                        label="数据格式"
                        {...formItemLayout}
                        >
                            {getFieldDecorator("format",{
                                initialValue:"txt",
                                rules: [{
                                    required: true, message: '请选择数据格式',
                                }]
                            })(
                                <RadioGroup>
                                    <Radio value="txt">TXT</Radio>
                                    <Radio value="json">JSON</Radio>
                                    {/* <Radio value="xml">XML</Radio> */}
                                </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem
                        label="分隔符"
                        {...formItemLayout}
                        >
                            {getFieldDecorator("ss",{
                                initialValue:1,
                                rules: [{
                                    required: true, message: '请选择分隔符',
                                }]
                            })(
                                <RadioGroup>
                                    <Radio value={1}>回车换行(\r\n)</Radio>
                                    <Radio value={2}>回车(\r)</Radio>
                                    <Radio value={3}>换行(\n)</Radio>
                                    <Radio value={4}>Tab(\t)</Radio>
                                    <Radio value={5}>换行(&lt;br&gt;)</Radio>
                                    {/* <Radio value={6}>其他符号</Radio> */}
                                </RadioGroup>
                            )}
                    </FormItem>
                    <FormItem
                        label="地区选择"
                        {...formItemLayout}
                        >
                            {getFieldDecorator("area",{
                                initialValue:1,
                                rules: [{
                                    required: true, message: '请选择地区',
                                }]
                            })(
                                <RadioGroup onChange={this.ChangeCityType.bind(this)}>
                                    <Radio value={1}>指定城市</Radio>
                                    <Radio value={2}>省份混拨</Radio>
                                </RadioGroup>
                            )}
                            <br/>
                            {
                                getFieldValue("area")==1?<Cascader placeholder="请选择地区" fieldNames={{ label: 'name', value: 'id', children: 'areas' }} options={areaOptions} onChange={this.getCity.bind(this)}/>
                                :<CheckboxGroup onChange={this.ChangePro.bind(this)} options={plainOptions} />
                            }
                            
                    </FormItem>
                    <FormItem  style={{textAlign:"center"}}>
                        <Button type="primary" icon="search" onClick={this.createUrl.bind(this)}>生成API链接</Button>
                    </FormItem>
                </Form>
               </Card>
                <Card title="API链接(请复制下面的链接地址，在新的浏览器或标签页打开并查看)" id="APICard" style={{margin :"10px 50px"}}>
                        <Row gutter={16}>
                            <Col span={20}>
                                <Input id="copyUrl" readOnly="readOnly" defaultValue={url} addonAfter={<Button type="primary" block disabled={url?false:true} onClick={this.copyUrl.bind(this)}>复制链接</Button>} placeholder="点击上方按钮，生成API链接" />
                            </Col>
                            <Col span={2} >
                            <Button type="primary" disabled={url?false:true}  onClick={this.openUrl.bind(this)}>打开链接</Button>
                            </Col>
                        </Row>
                        <h4 style={{paddingTop:"30px"}}>结果注释</h4>
                        <div>
                            {apiOptions.map((item, index) => (
                                <span key={index} style={{marginTop:"20px",display:"inline-block"}}>
                                    <Tag color="#2db7f4">
                                        {item.key}
                                    </Tag>
                                    <span style={{paddingRight:"30px"}}>
                                        {item.value}
                                    </span>
                                </span>
                            ))}
                        </div>
                </Card>
                <Card title="返回结果示例" style={{margin :"10px 50px"}}>
                    <p dangerouslySetInnerHTML={{__html: resHtml}}></p>
                    <h4 style={{paddingTop:"30px"}}>结果注释</h4>
                    {resOptions.map((item, index) => (
                        <span key={index} style={{marginTop:"20px",display:"inline-block"}}>
                            <Tag color="#2db7f4">
                                {item.key}
                            </Tag>
                            <span style={{paddingRight:"30px"}}>
                                {item.value}
                            </span>
                        </span>
                    ))}
                </Card>
                <Card title="使用方法" style={{margin :"10px 50px"}}>
                <List
                    bordered
                    dataSource={listData}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                />
                </Card>
                </div>
            </div>
        )
    }
}
export default Form.create()(GetIp);