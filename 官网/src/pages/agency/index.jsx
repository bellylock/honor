import React, {Component} from 'react';
import "./index.styl";
import {Table, Divider} from 'antd';

const columns = [{
    title: '合作对象',
    dataIndex: 'name',
    key: 'name',
    // render: text => <a href="javascript:;">{text}</a>,
}, {
    title: '充值金额（元）',
    dataIndex: 'price',
    key: 'price',
}, {
    title: '赠送比例',
    dataIndex: 'percentage',
    key: 'percentage',
},{
    title: '实际到账（元）',
    dataIndex: 'account',
    key: 'account',
},{
    title: '了解更多',
    dataIndex: 'more',
    key: 'more',
    render: (text, record) => {
        // return <a onClick={() => this.toShopDetails(record.more)}>商铺情况</a>;
        return <a onClick={() => console.log(text + '--' + record) }>{text}</a>;
    }
}];

const data = [{
    key: '1',
    name: '初级会员',
    price: 1000,
    percentage: '10%',
    account:1100,
    more:"咨询客服"
}, {
    key: '2',
    name: '中级会员',
    price: 3000,
    percentage: '20%',
    account:3600,
    more:"咨询客服"
}, {
    key: '3',
    name: '高级会员',
    price: 9000,
    percentage: '50%',
    account:13500,
    more:"咨询客服"
}, {
    key: '4',
    name: '合作伙伴',
    price: '-',
    percentage: '-',
    account:'-',
    more:"咨询客服"
}];


class Agency extends Component {
    render() {
        return (
            <div className="agency">
                <div className="bannerbox">
                    <div className="conbox">
                        <h1>代 理 合 作</h1>
                    </div>
                </div>
                <div className="main">
                    <div className="container">
                        <ul>
                            <li></li>
                            <li>
                                <span>合作条件：</span>
                                <i></i>
                                <p>一次性充值相应金额，终生成为合作伙伴</p>
                            </li>
                            <li>
                                <span>合作福利：</span>
                                <i></i>
                                <p>享受自助平台开通，续费，管理等便捷操作</p>
                                <p>享受24小时VIP一对一专属售后服务</p>
                                <p>享受公司针对会员不定期推出的各类优惠政策活动</p>
                            </li>
                            <li></li>
                        </ul>
                    </div>
                    <div className="table">
                        <h1>代理合作详情表</h1>
                        <Table columns={columns} dataSource={data} pagination={false}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Agency;