import React, { Component } from 'react';
import Carousels from "@/components/vpn";
import { Card, Button, Row, Col, Icon, Avatar,notification, InputNumber } from "antd";
import axios from "@/common/axios"
import cookie from 'react-cookies';
import './index.styl'
class VPN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgeArr : [require("@/img/vpn.jpg")],
            priceArr:[],
            // priceArr:[
            //     {
            //         id:1,
            //         seq:1,
            //         price:"40",
            //         activePrice:"55",
            //         name:"按周购买",
            //         list:[
            //             "7天使用时长",
            //             "多协议连接",
            //             "全国线路任选",
            //             "多平台支持",
            //             "海量优质IP",
            //             "极速独享带宽",
            //             "单地区混播随意使用",
            //             "电脑手机模拟器随意切换使用",
            //             1
            //
            //         ]
            //     },
            //     {
            //         id:2,
            //         seq:2,
            //         price:"120",
            //         name:"按月购买",
            //         activePrice:"230",
            //         list:[
            //             "30天使用时长",
            //             "多协议连接",
            //             "全国线路任选",
            //             "多平台支持",
            //             "海量优质IP",
            //             "极速独享带宽",
            //             "单地区混播随意使用",
            //             "电脑手机模拟器随意切换使用",
            //             1
            //         ]
            //     },
            //     {
            //         id:3,
            //         seq:3,
            //         price:"240",
            //         name:"按季度购买",
            //         activePrice:"600",
            //         list:[
            //             "90天使用时长",
            //             "多协议连接",
            //             "全国线路任选",
            //             "多平台支持",
            //             "海量优质IP",
            //             "极速独享带宽",
            //             "单地区混播随意使用",
            //             "电脑手机模拟器随意切换使用",
            //             1
            //         ]
            //     },
            // ]
        }
    }
    changeNum(index,value){
        if( typeof value !=="number") return;
        let arr = Object.assign([],this.state.priceArr);
        arr[index].list[5] = value
        this.setState({priceArr:arr})
    }
    componentWillMount(){}
    componentDidMount() {
        this.getData()
    }
    componentWillReceiveProps (newValue){}
    getData(){
        axios({
            method:"get",
            // url:"vpnPpg/list"
            url:"http://localhost:3333/vpnPpg/list"
        }).then((iData)=>{
            // if(iData.code != 0) return;
            // let Arr = Object.assign([],this.state.priceArr);
            // iData.data.data.forEach((item,index)=>{
            //     Arr[index].price = iData.data.data[index].price;
            //     Arr[index].seq = iData.data.data[index].seq;
            //     Arr[index].id = iData.data.data[index].id;
            // });

            if( iData.code == 200 ){
                this.setState({priceArr:iData.data});
                console.log(iData.data.length)
            }
        }).catch(function(err){
            console.log(err)
        })
    }
    buyVPn(id,num){
        if(!cookie.load("httpipId")) 
        return notification.warning({
            message: '警告',
            description: "请先登录！",
            duration : 2
        });
        axios({
            method:"get",
            url:"/vpn/purchase",
            params:{
                vpnPpgId:id,
                connections:num
            }
        }).then((iData)=>{
            if(iData.code !==0 ) return;
            notification.success({
                message: '提示',
                description: "购买成功！",
                duration : 2
            })
        })
    }
    render() {
        const { priceArr } = this.state;
        const priceCard = priceArr.map((item,index)=>(
            <Col span={8} className="cabin" key={index} offset={priceArr.length === 5 && [1,2,3,4].includes(index) ? 1:0}>
                <Card
                    hoverable
                    bordered={false}
                    className="innerBox"
                    style={{textAlign:"center"}}
                >
                <Avatar style={{ backgroundColor:"#4b98f7", verticalAlign: 'middle',position:"absolute",left:"0",top:"-20px" }} size="large">
                    {item.seq}
                </Avatar>
                <div style={{color:"#4b98f7",position:"absolute",left:"42px",top:"-12px",fontSize:'15px' }}>{item.name}</div>
                <div style={{color:"#000",fontWeight:600}}><span style={{fontSize:"20px"}}>￥ </span><span style={{fontSize:"30px"}}>{item.price}</span></div>
                <div className="sigma-content">
                    <div className="sigma-middle-line">
                        <span className="sigma-line-text">价目表</span>
                    </div>
                </div>
                <ul className="ulbox">
                    {item.list.map((items,indexs)=>{
                        if( typeof items !== "number" )
                           return <li key={indexs} className="listType">{items}</li>
                        // else
                        //    return
                        // <li key={indexs} className="listType">
                        //     连接数：
                        //     <InputNumber  min={1}
                        //             step ={1}
                        //             max={50}
                        //             precision={0}
                        //             value = {items}
                        //             onChange={this.changeNum.bind(this,index)}
                        //             />
                        // </li>
                    })}
                    
                </ul>
                {/*<p style={{textAlign:'center',marginLeft: "-35px",marginTop:'10px'}}>*/}
                        {/*金额总计:*/}
                    {/*<span style={{color:"#4b98f7"}}>{(item.price*100000)*(item.list[8])/100000}</span>元</p>*/}
                <Button type="primary"
                onClick = {()=>this.buyVPn(item.id,item.list[5])} 
                style={{borderRadius:"16px",position:"absolute",left:"calc(50% - 44px)",bottom:"-16px"}}>
                    立即购买
                </Button>
                </Card>
            </Col>
        )) 
        return(
            <div>
                <Carousels imgeArr={this.state.imgeArr}/>
                <Card style={{margin :"20px auto",width:"1170px"}}>
                <Row gutter={ 16 } className="feature" style={{marginTop:"50px"}}>
                        {priceCard}
                    </Row>
                </Card>
            </div>
        )
    }
}
export default VPN;