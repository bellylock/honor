import React, { Component } from 'react';
import Carousels from "@/components/packagebg";
import "../home/index.styl"
import "./index.styl"
import { Card, Button, Row, Col, Icon,Slider, Avatar, notification, InputNumber, Select} from "antd";
import axios from "@/common/axios"
import cookie from 'react-cookies';
import { relativeTimeRounding } from 'moment';
import { promises } from 'fs';
const ButtonGroup = Button.Group;
const Meta = Card.Meta;
const Option = Select.Option;




class BuyMeal extends Component {
    constructor(props) {
        super(props);
        this.optionsPrice=[{
            id:0,
            name:'一天'
        },{
            id:1,
            name:'一周'
        },{
            id:2,
            name:'一月'
        }]
        this.state = {
            imgeArr : [require("@/img/packagebg.jpg")],
            tabListNoTitle : [
                {
                    key:0,
                    tab:"按次购买"
                },
                {
                    key:1,
                    tab:"套餐购买"
                }
                // {
                //     key:4,
                //     tab:"半年卡"
                // },
                // {
                //     key:5,
                //     tab:"年卡"
                // },
                // {
                //     key:6,
                //     tab:"长期IP"
                // },
                // {
                //     key:7,
                //     tab:"VPN套餐"
                // }
            ],
            noTitleKey:'1',
            priceArr:[],
            onePriceArr:[],
            oneMoney:150,
            oneNum:5000,
            ipList:[],
            buy_duration:[],
            time:1,
            number:1000
        }
    }
    componentWillMount(){}
    componentDidMount() {
        // this.getOneTimeList()
        this.getOneList();
        this.getiplist()
    }
    componentWillReceiveProps (newValue){}
    onTabChange(key){
        this.setState({noTitleKey:key})
        switch(key){
            case "1":
            this.getOneList();break;
            case "0":
            // this.getOneTimeList()
            break;
            default: this.setState({priceArr:[]})
        }
    }
    // 购买时长
     handleChange = (value) => {
        console.log(value);
        let v = '';
        let p = this.state.ip_price;
        switch(value){
            case 0:
                v = 1;
                p = 0.01;
                break;
            case 1:
                v = 7;
                p = 0.0075;
                break;
            case 2:
                v = 30;
                p = 0.005;
                break;
        }
        this.setState({
            time:v,
            ip_price:p
        });
    };
    //每日数量
    onChange =  (value) => {
        console.log('changed', value);
        this.setState({number:value})
    }
    //购买ip套餐
    getiplist(){
        axios({
            method:"get",
            url:"http://localhost:3333/user/ip/ppg"
        }).then( (res) => {
            let arr = [];
            if( res.code == 200 ){
                arr = res.data
            }
            this.setState({
                ipList:arr,
                oneNum:arr[1].get_num,
                buy_duration:arr[0].buy_duration,
                ip_price:arr[0].price
            });
            console.log(this.ipList)
        }).catch( (err) => {
            console.log(err)
        } )
    }

    //获取周列表
    getList(key){
        this.setState({priceArr:[]})
        axios({
            method:"get",
            url:"ip/ppg/list",
            params:{
                type: key
            }
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            const { data } = iData;
            let Arr = [];
            data.map((item,index)=>{
                Arr.push({
                    id:item.seq,
                    orderId:item.id,
                    price:item.price,
                    activePrice:"50",
                    list:[
                        `每天使用上限：${item.ipLimitPerDay}个`,
                        `稳定时长：${(item.minDuration/60).toFixed(2)}~${(item.maxDuration/60).toFixed(2)}小时`,
                        `一次最多提取数量： ${item.maximumIp} 个`,
                        "重复度：360天去重",
                        "匿名度：高匿",
                        `API最快调用频率：${item.apiCallFrequency}秒一次`,
                        "并发请求数量：不限制",
                        "HTTP,HTTPS,SOCK5支持"
                    ],
                    num:1000
                })
            })

            this.setState({priceArr:Arr})
        })
    }
    getOneTimeList(){
        axios({
            method:"get",
            url:"ip/ppv/list",
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            const { data } = iData;
            this.setState({
                onePriceArr:[{
                    price:'50',
                    activePrice:'50',
                    list:[`${data[0].name}：${data[0].price}元/IP`,
                        // `${data[1].name}：${data[1].price}元/IP`,
                        // `${data[2].name}：${data[2].price}元/IP`,
                        // `${data[3].name}：${data[3].price}元/IP`,
                        // `${data[4].name}：${data[4].price}元/IP`
                    ]
                    },{
                        price:'200',
                        activePrice:'200',
                        list:[`${data[0].name}：${data[0].price}元/IP`,
                            `${data[1].name}：${data[1].price}元/IP`,
                            `${data[2].name}：${data[2].price}元/IP`,
                            `${data[3].name}：${data[3].price}元/IP`,
                            `${data[4].name}：${data[4].price}元/IP`]
                    },
                    {
                        price:'500',
                        activePrice:'550',
                        list:[`${data[0].name}：${data[0].price}元/IP`,
                            `${data[1].name}：${data[1].price}元/IP`,
                            `${data[2].name}：${data[2].price}元/IP`,
                            `${data[3].name}：${data[3].price}元/IP`,
                            `${data[4].name}：${data[4].price}元/IP`]
                    },
                    {
                        price:'1000',
                        activePrice:'1200',
                        list:[`${data[0].name}：${data[0].price}元/IP`,
                            `${data[1].name}：${data[1].price}元/IP`,
                            `${data[2].name}：${data[2].price}元/IP`,
                            `${data[3].name}：${data[3].price}元/IP`,
                            `${data[4].name}：${data[4].price}元/IP`]
                    }
                ]
            })
        })
    }
    //获取次列表
    getOneList(){
        axios({
            method:"get",
            url:"/ip/ppg/list",
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            let data  = iData.data;
            new Promise((resolve, reject )=>{
                let a = 0;
                data.forEach((item,index)=>{
                    this.getPrice(item.id).then((iDatas)=>{
                        item.priceList = iDatas
                        let priceList = Object.assign([],iDatas);
                        item.price = priceList.filter((items)=>{
                            if(items.type===0) return items
                        })[0].price;
                        item.taocanType = 0;
                        item.ipLimitPerDay = 1000
                        a++;
                        if(a === data.length )
                            resolve(data)
                    })
                    return item;
                });
                
            }).then((data)=>{
                this.setState({priceArr:data})
            })
        })
    }
    getPrice(ipPpgId){
        return axios({
            method:"get",
            url:`/ip/ppgInfo/list`,
            params: {
                ipPpgId
            }
        }).then((data)=>{
            if(data.code!==0) return;
            return data.data
        })
    }
    //购买
    buyMeal(val){
        if(!cookie.load("httpipId")) 
        return notification.warning({
            message: '警告',
            description: "请先登录！",
            duration : 2
        });
        axios({
            method:"post",
            url:"/user/ip/ppg",
            data:val
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            notification.success({
                message: '提示',
                description: "购买成功！",
                duration : 2
            })
        })
    }
    changeNum(index,val){
        if(val){
            let  priceArr = Object.assign([],this.state.priceArr);
            priceArr[index]["ipLimitPerDay"] = val
            this.setState({priceArr});
        }
    }
    changeTime(index,val){
            let  priceArr = JSON.parse(JSON.stringify(this.state.priceArr));
            let list = Object.assign([],priceArr[index]["priceList"]);
            priceArr[index]["price"] = list.filter(item=>{if(item.type == val) return item})[0].price;
            priceArr[index]["taocanType"] = val;
            this.setState({priceArr});
    }
    onBlur(index){
        let priceArr = Object.assign([],this.state.priceArr);
        priceArr[index]["ipLimitPerDay"] = Math.ceil( priceArr[index]["ipLimitPerDay"]/1000)*1000;
        this.setState({priceArr});
    }
    changeNumOne(value){
        if(typeof value == "number")
           this.setState({oneNum:value})
    }
    render() {
        const {ipList,buy_duration, imgeArr , priceArr, tabListNoTitle, noTitleKey,onePriceArr, oneMoney,oneNum} = this.state;
        const marks ={
            5000:'5000',
            30000:'30000',
            55000:'55000',
        }
        const priceCard = onePriceArr.map((item,index)=>
        <Col span={6} key={index}>
            <Card
                hoverable
                bordered={false}
                className="innerBoxs"
                style={{textAlign:"center"}}
            >
                <Avatar style={{ backgroundColor:"#4b98f7", verticalAlign: 'middle',position:"absolute",left:"0",top:"-20px" }} size="large">
                    {index+1}
                </Avatar>
                <h2 style={{position:"absolute",left:"50px",top:"-40px", color: "#4b98f7",fontSize:18}}>
                    预充值金额
                </h2>
                <div style={{color:"#4b98f7",fontWeight:600}}>
                    <span style={{fontSize:"20px"}}>￥ </span>
                    <span style={{fontSize:"30px"}}>{item.price}</span>
                </div>
                <div style={{color:"#FF7153",fontWeight:600}}>
                    <span style={{fontSize:"16px"}}>实到：{item.activePrice}</span>
                </div>
                <div className="sigma-content">
                    <div className="sigma-middle-line">
                        <span className="sigma-line-text">价目表</span>
                    </div>
                </div>
                <ul>{
                    item.list.map((items,indexs)=>
                        <li className="listType">
                            {items}
                        </li>
                    )
                }
                </ul>
            </Card>
        </Col>)
        // const priceCards = priceArr[0]? priceArr.map((item,index)=>
        //     <Col span={8} key={index}>
        //         <Card
        //             hoverable
        //             bordered={false}
        //             className="innerBoxs"
        //             style={{textAlign:"center"}}
        //         >
        //             <Avatar style={{ backgroundColor:"#4b98f7", verticalAlign: 'middle',position:"absolute",left:"0",top:"-20px" }} size="large">
        //                 {index+1}
        //             </Avatar>
        //             <h2>{item.name}</h2>
        //             <div style={{color:"#4b98f7",fontWeight:600}}>
        //                 <span style={{fontSize:"20px"}}>￥ </span>
        //                 <span style={{fontSize:"30px"}}>{item.price}</span>
        //             </div>
        //             <div className="sigma-content">
        //                 <div className="sigma-middle-line">
        //                     <span className="sigma-line-text">特点</span>
        //                 </div>
        //             </div>
        //             <ul>
        //                 <li className="listType">
        //                     每日数量：
        //                         <InputNumber min={1000}
        //                             style={{ float: "right",marginRight: 30}}
        //                             step ={1000}
        //                             onBlur = {this.onBlur.bind(this,index)}
        //                             max={100000}
        //                             value = {item.ipLimitPerDay}
        //                             defaultValue={1000}
        //                             onChange={this.changeNum.bind(this,index)}/>
        //                 </li>
        //                 <li className="listType">购买时长:
        //                     <Select  value = {item.taocanType}
        //                         placeholder="请选择购买时长"
        //                         style={{width:88, float: "right",marginRight: 30}}
        //                         onChange={this.changeTime.bind(this,index)}>
        //                     {
        //                         this.optionsPrice.map(itemPrice=>
        //                             <Option
        //                             value={itemPrice.id}
        //                             key={itemPrice.id}>
        //                             {itemPrice.name}
        //                         </Option>)
        //                     }
        //                     </Select>
        //                 </li>
        //                 <li className="listType">稳定时长: <span>5分钟-15分钟</span></li>
        //                 <li className="listType">一次最多提取数量: <span>{item.maximumIp}</span></li>
        //                 <li className="listType">IP可用率: <span>99%</span></li>
        //                 <li className="listType">匿名度: <span>高</span></li>
        //                 <li className="listType">API最快调用频率: <span>{item.apiCallFrequency}s</span></li>
        //                 <li className="listType">HTTP/HTTPS/SOCKS5</li>
        //                 <li className="listType">多机器调用</li>
        //             </ul>
        //             <p style={{textAlign:'center',marginLeft: "-35px",marginTop:'10px'}}>
        //                 金额总计:
        //             <span style={{color:"#4b98f7"}}>{(item.price*100000)*(item.ipLimitPerDay)*parseInt([1,7,30][item.taocanType])/100000}</span>元</p>
        //             <Button type="primary"
        //                 onClick={()=>this.buyMeal({id:item.id,type:item.taocanType,ipLimitPerDay:item.ipLimitPerDay})}
        //                 style={{borderRadius:"16px",position:"absolute",left:"calc(50% - 44px)",bottom:"-16px"}}>
        //                     购买套餐
        //             </Button>
        //         </Card>
        //     </Col>
        // ):null
        return(
            <div className="buyMeal">
                <Carousels imgeArr={imgeArr}/>
    
                <Card
                    style={{ margin :"10px 50px" }}
                    // tabList={tabListNoTitle}
                    // activeTabKey={noTitleKey}
                    // onTabChange={(key) => { this.onTabChange(key); }}
                >
                {/* {
                    JSON.stringify(priceArr) !=="[]"?
                    <Row gutter={priceArr.length === 4 ? 16 : 0 } className="feature" style={{marginTop:"50px"}}>
                        {priceCard}
                    </Row>:<div>开发中。。。</div>
                } */}
                    
                    <Row gutter={ 16 } className="feature" style={{marginTop:"50px"}}>
                        {/* {noTitleKey==='0'?priceCard:priceCards} */}
                        {/*{priceCards}*/}

                        {/*开始*/}
                        {
                            ipList.map( (item,index) => {
                                return (
                                    <Col span={8} key={index}>
                                        <Card
                                            hoverable
                                            bordered={false}
                                            className="innerBoxs"
                                            style={{textAlign:"center",height:"544px"}}
                                        >
                                            <Avatar style={{ backgroundColor:"#4b98f7", verticalAlign: 'middle',position:"absolute",left:"0",top:"-20px" }} size="large">
                                                {item.id}
                                            </Avatar>
                                            <img className={ item.getnumstatus == 0 ? 'num_none':'' } style={{position:"absolute",right:"0",top:"-20px",width:80}} src={require("@/img/timg.png")}/>
                                            <h2>{item.name}</h2>
                                            <div style={{color:"#4b98f7",fontWeight:600}}>
                                                <span className={item.setting ? 'num_none':''} style={{fontSize:"20px"}}>￥ </span>
                                                <span className={item.pri_status == 0 ? 'dayinp':'num_none'} style={{fontSize:"30px"}}>{item.price}</span>
                                                <span className={item.pri_status == 1 ? 'dayinp':'num_none'} style={{fontSize:"30px"}}>{this.state.ip_price}</span>
                                                {/*<span style={{fontSize:"30px"}}>{parseInt((oneNum*0.3).toFixed(10))}</span>*/}
                                            </div>
                                            <div className="sigma-content">
                                                <div className="sigma-middle-line">
                                                    <span className="sigma-line-text">特点</span>
                                                </div>
                                            </div>
                                            <ul>
                                                <li className={`listType ${item.getnumstatus == 0 ? 'num_none':''}`}>
                                                    提取数量：
                                                    <Row gutter={16} >
                                                        <Col span={16}>
                                                            <Slider min={5000} max={55000} marks={marks} value={oneNum} onChange={this.changeNumOne.bind(this)}/>
                                                        </Col>
                                                        <Col span={6}>
                                                            <InputNumber min={5000} max={55000} precision={0} value={oneNum} onChange={this.changeNumOne.bind(this)} />
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li className={`listType ${item.setting ? 'num_none':''}`}>每日数量：
                                                    <span className={ item.day_num_status == 1 ? 'dayinp':'num_none' }>
                                                        <InputNumber min={1000} max={100000} step={1000} defaultValue={item.day_num} onChange={this.onChange} />
                                                    </span>
                                                    <span className={ item.day_num_status == 0 ? 'dayinp':'num_none' }>{item.day_num}</span>
                                                </li>
                                                <li className={`listType ${item.buy_duration ? 'h_has':'num_none'}`}>购买时长：
                                                    <span>
                                                        <Select defaultValue="一天" style={{ width: 80 }} onChange={this.handleChange}>
                                                            {
                                                                buy_duration.map( (v,k) => {
                                                                    return (
                                                                        <Option key={k} value={k}>{v}</Option>
                                                                    )
                                                                } )
                                                            }
                                                        </Select>
                                                    </span>
                                                </li>
                                                <li className="listType">稳定时长: <span>{item.steady_duration}</span></li>
                                                <li className={`listType ${item.setting ? 'num_none':''}`}>一次最多提取数量: <span>{item.max_ip_num}</span></li>
                                                <li className={`listType ${item.setting ? 'num_none':''}`}>IP可用率: <span>{item.ip_available_rate}</span></li>
                                                <li className="listType">匿名度: <span>{item.anonymity}</span></li>
                                                <li className={`listType ${item.setting ? 'num_none':''}`}>API最快调用频率: <span>{item.api_rate}</span></li>
                                                <li className={`listType ${item.setting ? 'num_none':''}`}>{item.h1}</li>
                                                <li className={`listType ${item.setting ? 'num_none':''}`}>{item.h2}</li>
                                                <li className={`listType ${item.setting ? 'h_has':'num_none'}`} >支持类型：<span>{item.support}</span></li>
                                                <li className={`listType ${item.setting ? 'h_has':'num_none'}`} >{item.h3}</li>

                                            </ul>
                                            <p className={`cur_pri ${item.purchase_status == 1 ? 'dayinp':'num_none'}`}>
                                                金额总计：<span>{this.state.ip_price * this.state.number * this.state.time}</span>元
                                            </p>
                                            <a className={`pur_now ${item.purchase_status == 1 ? 'h_has':'num_none'}`} href="javascript:;">购买套餐</a>
                                            {/* <p style={{textAlign:'center',marginLeft: "-35px",marginTop:'10px'}}>
                                    金额总计:
                                <span style={{color:"#4b98f7"}}>{(item.price*100000)*(item.ipLimitPerDay)*parseInt([1,7,30][item.taocanType])/100000}</span>元</p> */}
                                            {/* <Button type="primary"
                                    onClick={()=>this.buyMeal({id:item.id,type:item.taocanType,ipLimitPerDay:item.ipLimitPerDay})}
                                    style={{borderRadius:"16px",position:"absolute",left:"calc(50% - 44px)",bottom:"-16px"}}>
                                        购买套餐
                                </Button> */}
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                        {/*<Col span={8}>*/}
                            {/*<Card*/}
                                {/*hoverable*/}
                                {/*bordered={false}*/}
                                {/*className="innerBoxs"*/}
                                {/*style={{textAlign:"center",height:"544px"}}*/}
                            {/*>*/}
                                {/*<Avatar style={{ backgroundColor:"#4b98f7", verticalAlign: 'middle',position:"absolute",left:"0",top:"-20px" }} size="large">*/}
                                    {/*2*/}
                                {/*</Avatar>*/}
                                {/*<img style={{position:"absolute",right:"0",top:"-20px",width:80}} src={require("@/img/timg.png")}/>*/}
                                {/*<h2>按次购买</h2>*/}
                                {/*<div style={{color:"#4b98f7",fontWeight:600}}>*/}
                                    {/*<span style={{fontSize:"20px"}}>￥ </span>*/}
                                    {/*<span style={{fontSize:"30px"}}>{parseInt((oneNum*0.3).toFixed(10))}</span>*/}
                                {/*</div>*/}
                                {/*<div className="sigma-content">*/}
                                    {/*<div className="sigma-middle-line">*/}
                                        {/*<span className="sigma-line-text">特点</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<ul>*/}
                                    {/*<li className="listType">*/}
                                        {/*提取数量：*/}
                                        {/*<Row gutter={16}>*/}
                                            {/*<Col span={18}>*/}
                                                {/*<Slider min={5000} max={55000} marks={marks} value={oneNum} onChange={this.changeNumOne.bind(this)}/>*/}
                                            {/*</Col>    */}
                                            {/*<Col span={6}>*/}
                                                {/*<InputNumber min={5000} max={55000} precision={0} value={oneNum} onChange={this.changeNumOne.bind(this)} />  */}
                                            {/*</Col>*/}
                                        {/*</Row>*/}
                                    {/*</li>*/}
                                    {/*/!*<li className="listType">*!/*/}
                                        {/*/!*每日数量：<span>不限</span>*!/*/}
                                            {/*/!* <InputNumber min={1000}*/}
                                                {/*style={{ float: "right",marginRight: 30}}*/}
                                                {/*step ={1000}*/}
                                                {/*onBlur = {this.onBlur.bind(this,index)}*/}
                                                {/*max={100000}*/}
                                                {/*value = {item.ipLimitPerDay}*/}
                                                {/*defaultValue={1000}*/}
                                                {/*onChange={this.changeNum.bind(this,index)}/> *!/*/}
                                    {/*/!*</li>*!/*/}
                                    {/*/!* <li className="listType">购买时长:*/}
                                        {/*<Select  value = {item.taocanType}*/}
                                            {/*placeholder="请选择购买时长"*/}
                                            {/*style={{width:88, float: "right",marginRight: 30}}*/}
                                            {/*onChange={this.changeTime.bind(this,index)}>*/}
                                        {/*{*/}
                                            {/*this.optionsPrice.map(itemPrice=>*/}
                                                {/*<Option*/}
                                                {/*value={itemPrice.id}*/}
                                                {/*key={itemPrice.id}>*/}
                                                {/*{itemPrice.name}*/}
                                            {/*</Option>)*/}
                                        {/*}*/}
                                        {/*</Select>*/}
                                    {/*</li> *!/*/}
                                    {/*<li className="listType">每日数量：<span>不限</span></li>*/}
                                    {/*<li className="listType">稳定时长: <span>5分钟-15分钟</span></li>*/}
                                    {/*<li className="listType">一次最多提取数量: <span>200</span></li>*/}
                                    {/*<li className="listType">IP可用率: <span>99%</span></li>*/}
                                    {/*<li className="listType">匿名度: <span>高</span></li>*/}
                                    {/*<li className="listType">API最快调用频率: <span>1s</span></li>*/}
                                    {/*<li className="listType">HTTP/HTTPS/SOCKS5</li>*/}
                                    {/*<li className="listType">多机器调用</li>*/}
                                {/*</ul>*/}
                                {/*/!* <p style={{textAlign:'center',marginLeft: "-35px",marginTop:'10px'}}>*/}
                                    {/*金额总计:*/}
                                {/*<span style={{color:"#4b98f7"}}>{(item.price*100000)*(item.ipLimitPerDay)*parseInt([1,7,30][item.taocanType])/100000}</span>元</p> *!/*/}
                                {/*/!* <Button type="primary"*/}
                                    {/*onClick={()=>this.buyMeal({id:item.id,type:item.taocanType,ipLimitPerDay:item.ipLimitPerDay})}*/}
                                    {/*style={{borderRadius:"16px",position:"absolute",left:"calc(50% - 44px)",bottom:"-16px"}}>*/}
                                        {/*购买套餐*/}
                                {/*</Button> *!/*/}
                            {/*</Card>*/}
                        {/*</Col>*/}

                        {/*<Col span={8}>*/}
                            {/*<Card*/}
                                {/*hoverable*/}
                                {/*bordered={false}*/}
                                {/*className="innerBoxs"*/}
                                {/*style={{textAlign:"center",height:"544px"}}*/}
                            {/*>*/}
                                {/*<Avatar style={{ backgroundColor:"#4b98f7", verticalAlign: 'middle',position:"absolute",left:"0",top:"-20px" }} size="large">*/}
                                    {/*3*/}
                                {/*</Avatar>*/}
                                {/*<h2>长效IP</h2>*/}
                                {/*<div style={{color:"#4b98f7",fontWeight:600}}>*/}
                                    {/*<span style={{fontSize:"20px"}}>待定 </span>*/}
                                {/*</div>*/}
                                {/*<div className="sigma-content">*/}
                                    {/*<div className="sigma-middle-line">*/}
                                        {/*<span className="sigma-line-text">特点</span>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<ul>*/}
                                     {/*<li className="listType">购买时长:*/}
                                        {/*<Select  value = {item.taocanType}*/}
                                            {/*placeholder="请选择购买时长"*/}
                                            {/*style={{width:88, float: "right",marginRight: 30}}*/}
                                            {/*onChange={this.changeTime.bind(this,index)}>*/}
                                        {/*{*/}
                                            {/*this.optionsPrice.map(itemPrice=>*/}
                                                {/*<Option*/}
                                                {/*value={itemPrice.id}*/}
                                                {/*key={itemPrice.id}>*/}
                                                {/*{itemPrice.name}*/}
                                            {/*</Option>)*/}
                                        {/*}*/}
                                        {/*</Select>*/}
                                    {/*</li> */}
                                    {/*<li className="listType">匿名度: <span>高</span></li>*/}
                                    {/*<li className="listType">支持类型: <span>HTTP</span></li>*/}
                                    {/*<li className="listType">稳定时长: <span>48小时</span></li>*/}
                                    {/*<li className="listType">*/}
                                       {/*建设中。。。*/}
                                    {/*</li>*/}
                                   {/**/}
                                {/*</ul>*/}
                            {/*</Card>*/}
                        {/*</Col>*/}
                    </Row>
                    
                </Card>
                    

            </div>
        )
    }
}
export default BuyMeal;