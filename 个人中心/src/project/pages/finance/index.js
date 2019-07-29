import React, {Component} from 'react';
import { Table, Tag, DatePicker } from "antd";
import './index.scss';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import axios from 'axios';

const {  RangePicker } = DatePicker;

function onChange(date, dateString) {
    console.log(date, dateString);
}


const columns = [
    {
    title: '消费前金额',
    dataIndex: 'bef_money',
    key: 'bef_money'
},{
    title: '消费金额',
    key: 'cost',
    dataIndex: 'cost',
    render: cost => (
        <span className="status" >
            {cost.map(tag => {
                let color = tag.size > 5 ? 'geekblue' : 'green';
                if (tag.status == 0) {
                    color = 'volcano';
                }else{
                    color = 'green'
                }
                return <Tag color={color} key={tag.status}>{tag.value.toUpperCase()}</Tag>;
            })
            }
        </span>
    )
}, {
    title: '账户余额',
    dataIndex: 'surplus',
    key: 'surplus',
},{
    title: '说明',
    dataIndex: 'info',
    key:'info'
},{
    title: '时间',
    dataIndex: 'time',
}];


class Finance extends Component {
    constructor(){
        super();
        this.state = {
            data:[]
        }
    }

    componentDidMount(){
        this.getList()
    }

    getList(){
        axios.get("http://localhost:3333/financeDiary"
        ).then( (res) => {
            if( res.data.code == 200 ){
                this.setState({data:res.data.data})
            }
        }).catch( (err) => {
            console.log(err)
        })
    }

    render() {
        return (
            <div>
                <h2>财务日志</h2>
                <div className="pick">
                    <RangePicker onChange={onChange} locale={locale} />
                    <a href="javascript:;">搜索</a>
                </div>
                <div className="financebox">
                    <Table
                        columns={columns}
                        dataSource={this.state.data}
                        bordered
                    />
                </div>
            </div>
        );
    }
}

export default Finance;


