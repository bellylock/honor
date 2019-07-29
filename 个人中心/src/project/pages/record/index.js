import React, {Component} from 'react';
import './index.scss';
import { Input } from 'antd';
import { Table } from 'antd';
import axios from 'axios'

const columns = [{
    title: '序号',
    dataIndex: 'num',
}, {
    title: '协议类型',
    className: 'column-money',
    dataIndex: 'sty',
}, {
    title: '提取方式',
    dataIndex: 'way',
}, {
    title: '提取数量',
    dataIndex: 'amount',
}, {
    title: '提取ip时间',
    dataIndex: 'time',
}
];



class Record extends Component {
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
        axios.get("http://localhost:3333/recordOfUse"
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
                <h2>使用记录</h2>
                <div className="recordbox">
                    <div className="example-input">
                        <Input placeholder="请输入ip地址" />
                        <a href="###">查询</a>
                    </div>
                    <div className="record_list">
                        <Table
                            columns={columns}
                            dataSource={this.state.data}
                            bordered
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Record;
