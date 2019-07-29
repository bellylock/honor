import React, {Component} from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import {Layout, Menu, Breadcrumb, Icon,} from 'antd';
import {menuList} from '../../menu/menulist'


const {  Footer, Sider,} = Layout;
const SubMenu = Menu.SubMenu;

class Side extends Component {
    state = {
        collapsed: false,
    };

    componentDidMount(){
        // console.log(menuList)
    };

    onCollapse = (collapsed) => {
        // console.log(collapsed);
        this.setState({ collapsed });
    };
    render() {
        return (
            <Layout style={{height: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        {
                            menuList.map( (item,index) => {
                                if( item.children && item.children.length > 0 ){
                                    return (
                                        <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                                            {
                                                item.children.map( (v,i) => {
                                                    return <Menu.Item key={v.id}><Link to={"/home/" + v.url}>{v.name}</Link></Menu.Item>
                                                } )
                                            }
                                        </SubMenu>
                                    )
                                }
                                return (
                                    <Menu.Item key={item.id}>
                                        <Link to={"/" + item.url}>
                                            <Icon type={item.icon} />
                                            <span>{item.name}</span>
                                        </Link>
                                    </Menu.Item>
                                )
                            } )
                        }
                    </Menu>
                </Sider>
            </Layout>
        );
    }
}
export default Side;

