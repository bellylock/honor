import React, {Component} from 'react';
import "./index.styl";
import { Icon } from 'antd'

class Download extends Component {
    constructor(){
        super();
        this.state = {
            list:[
                {name:'windows客户端',version:'1.0.7.18',size:'1M',suit:'xp/win7及以上',btn:'立即下载',img:require("@/img/c1.png"),status:1},
                {name:'进程客户端',btn:'即将上线',img:require("@/img/c4.png"),building:'建设中',status:0}
            ]
        }
    }
    render(){
        const {list} = this.state;
        return(
            <div className="download">
                <div className="downbox">
                    {/* 建设中 即将上线*/}
                    {/**/}
                    <div className="bannerimg">
                        <div className="container">
                            <h2>软件下载</h2>
                            <span>平台种类丰富，总有一款适合您</span>
                        </div>
                    </div>
                    <div className="bins">
                        {
                            list.map( (item,index) => {
                                return (
                                    <div className="cabin" key={index}>
                                        <img className='warnpic' src={item.img}/>
                                        <div className="top"></div>
                                        <div className="text">
                                            <p>{item.name}</p>
                                            <p className={ item.status == 0 ? 'hide' : '' }>版本：{item.version}</p>
                                            <p className={ item.status == 0 ? 'hide' : '' }>大小：{item.size}</p>
                                            <p className={ item.status == 0 ? 'hide' : '' }>适用系统：{item.suit}</p>
                                            <p className={ item.status == 0 ? 'spep' : '' }>{item.building}</p>
                                            <a href="###">{item.btn}</a>
                                        </div>
                                    </div>
                                )
                            } )
                        }

                    </div>
                </div>
            </div>
        )
    }
}

export default Download;