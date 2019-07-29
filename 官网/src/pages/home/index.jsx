import React, { Component } from 'react';
import Carousels from "@/components/carousel";
import { Card, Col, Row, Icon} from 'antd';
import "./index.styl"
const Meta = Card.Meta;
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // imgeArr : [require("@/img/home1.png"), require("@/img/home2.jpg")]
            imgeArr : [require("@/img/banner2.jpg"), require("@/img/banner3.jpg")]
        }
    }
    componentWillMount(){}
    componentDidMount() {}
    // componentWillReceiveProps (newValue){}
    render() {
        return(
            <div className="home">
                <Carousels imgeArr={this.state.imgeArr}/>
                <Card className="feature">
                    <div className="boxes">
                        <h1>产品特点概述</h1>
                        <Row gutter={16}>
                            <Col span={6} className="bins bin1">
                            <Card
                                hoverable
                                bordered={false}
                                className="innerBox"
                                cover={<img style={{width:"80px",marginLeft:"calc(50% - 40px)",paddingTop:"40px",marginBottom:"24px"}} src={require("@/img/on1.png")}/>}
                            >
                
                                <h2 style={{textAlign:"center",color:"white"}}>海量IP资源</h2>
                                <p  style={{textAlign:"center",color:"white"}}>全国各地320多个城市</p>
                                <p  style={{textAlign:"center",color:"white"}}>高品质代理服务器</p>
                            </Card>
                            </Col>
                            <Col span={6} className="bins bin2">
                                <Card
                                    hoverable
                                    bordered={false}
                                    className="innerBox"
                                    cover={<img style={{width:"80px",marginLeft:"calc(50% - 40px)",paddingTop:"40px",marginBottom:"24px"}} src={require("@/img/on2.png")}/>}
                                >
                                    <h2 style={{textAlign:"center",color:"white"}}>高品质真实IP</h2>
                                    <p style={{textAlign:"center",color:"white"}}>所有IP均为高匿级别</p>
                                    <p style={{textAlign:"center",color:"white"}}>保证您的隐私安全</p>
                                </Card>
                            </Col>
                            <Col span={6} className="bins bin3">
                                <Card
                                    hoverable
                                    bordered={false}
                                    className="innerBox"
                                    cover={<img style={{width:"80px",marginLeft:"calc(50% - 40px)",paddingTop:"40px",marginBottom:"24px"}} src={require("@/img/on3.png")}/>}
                                >
                                     <h2 style={{textAlign:"center",color:"white"}}>安全稳定</h2>
                                    <p style={{textAlign:"center",color:"white"}}>用户连接稳定，不掉线</p>
                                    <p style={{textAlign:"center",color:"white"}}>下载速度快，单ip2.4M宽带</p>
                                </Card>
                            </Col>
                            <Col span={6} className="bins bin4">
                                <Card
                                    hoverable
                                    bordered={false}
                                    className="innerBox"
                                    cover={<img style={{width:"80px",marginLeft:"calc(50% - 40px)",paddingTop:"40px",marginBottom:"24px"}} src={require("@/img/on4.png")}/>}
                                >
                                    <h2 style={{textAlign:"center",color:"white"}}>专属企业定制</h2>
                                    <p style={{textAlign:"center",color:"white"}}>每日24小时去重服务</p>
                                    <p  style={{textAlign:"center",color:"white"}}>为您带来更好的快捷体验</p>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <div className="advice">
                    <img src={require("@/img/pic.png")} alt=""/>
                    <p>荣耀优惠推广期，可折扣购买与朋友一起分享</p>
                </div>
            </div>
        )
    }
}
export default Home;