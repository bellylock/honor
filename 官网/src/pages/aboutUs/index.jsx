import React, {Component} from 'react';
import "./index.styl";
import { Icon } from 'antd'

class Aboutus extends Component {
    render(){
        return(
            <div className="aboutusbox">
                <img className='aboutpic' src={require("@/img/about1.jpg")}/>
                <div className="adv">
                    <div className="container">
                        <h2>我们的优势</h2>
                        <p className="vicetit">昆明晏宇科技有限公司旗下设有嘉和数码（www.jhsm.cn）是互联网云基础服务平台致力于提供专业的云主机、虚拟主机、服务器租用、ADSL动态VPS主机、云建站、可信企业网站认证、以及互联网安全业务等</p>
                        <div className="cabin">
                            <div className="bins">
                                <span>7x24</span>
                                <p>免费无忧服务</p>
                            </div>
                            <div className="bins">
                                <span>30+</span>
                                <p>合作伙伴</p>
                            </div>
                            <div className="bins">
                                <span>200w+</span>
                                <p>个ip地址存量</p>
                            </div>
                            <div className="bins">
                                <span>2w+</span>
                                <p>云主机保有量</p>
                            </div>
                        </div>
                        <p className="vicetit">嘉和一路走来，市场主流云计算的所有顶级代理自己开发的云计算整合平台，云主机管理系统，PPTP，SSTP,L2TP软件多个客户端。已成为拥有核心竞争力的互联网服务提供商</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Aboutus;
