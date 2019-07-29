import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./footer.styl";
import menu from "@/common/menu.json";
import { Menu, Icon, Button} from "antd";
import { observer, inject } from "mobx-react";
const { Item } = Menu;
@inject(['store'])
@observer
class IpFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount(){
        let path = window.location.hash.replace('#','');
        menu.forEach(element => {
            if(element.key == path)
                return this.props.store.activePathChange(element.id)
        });
    }
    componentDidMount() {}
    // componentWillReceiveProps (newValue){}
    menuClick=({ item, key, keyPath })=>{
        this.props.store.activePathChange(key)
    }
    render() {
        const MenuList = menu.map((item)=>{
            return <Item key={item.id.toString()} className="link">
                        <Link to={item.key}>
                            <span>{item.name}</span>
                        </Link>
                    </Item>
        })
        return(
            <div className="footer">
                    {/* <div className="left_nav">
                        <Menu
                        onClick = {this.menuClick.bind(this)}
                        selectedKeys={[this.props.store.activePath]}
                        mode="horizontal" >
                            {MenuList}
                            <Item className="baseInfo">
                                <div>
                                    客服电话
                                    <p>
                                        <a>电话：13670229404</a>
                                    </p>
                                </div>
                            </Item>
                            <Item className="baseInfo">
                                <div>
                                    商务合作
                                    <p>
                                      <a> QQ：32205690</a>
                                    </p>
                                </div>
                            </Item>
                        </Menu>
                    </div> */}
                    <div className="remake">
                        {/* <p>粤ICP备17156号 深圳莱森供应链服务有限公司 版权所有</p> */}
                        <p>声明：本站资源仅限用来计算机技术学习及大数据抓取、爬虫研究等合法行为。</p>
                        <p>声明：利用本站资源从事任何违反中国法律法规的行为，由此引起的一切后果与本站无关。</p>
                    </div>
            </div>
        )
    }
}
export default IpFooter;