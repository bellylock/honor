import React, {Component} from 'react';
import './index.scss';
import {Table, Input, Button, Popconfirm, Form, Modal,} from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                                onBlur={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

class Whitelist extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'id',
            width: '10%',
            editable: false,
        }, {
            title: 'ip地址',
            dataIndex: 'address',
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
        }, {
            title: '更新时间',
            dataIndex: 'update_time',
        }, {
            title: '状态',
            dataIndex: 'status',
        }, {
            title: '操作',
            width:'180px',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <div className="operatebox">
                            <Popconfirm title="确定锁定?" okText="确认" cancelText="取消" onConfirm={() => this.handleLock(record.key)}>
                                <a href="###">锁定</a>
                            </Popconfirm>
                            <Popconfirm title="确定删除?" okText="确认" cancelText="取消" onConfirm={() => this.handleDelete(record.key)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        </div>


                    ) : null
            ),
        }];

        this.state = {
            dataSource: [],
            count: "",
            visible: false,
            ip:''
        };
    }

    componentDidMount(){
        this.state.count = this.state.dataSource.length + 1;
        this.getIpList()
    }

    getIpList(){
        axios.get("http://localhost:3333/whiteIpList"
        ).then( (res) => {
            if( res.data.code == 200){
                this.setState({
                    dataSource:res.data.data
                })
            }
        }).catch( (err) => {
            console.log(err)
        })
    }

    showModal = () => {
        this.setState({visible: true});
    }

    ipChange = (e) => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        if( month <=9 ){
            month = '0' + month
        }
        if( day <=9 ){
            day = '0' + day
        }
        if( hour <=9 ){
            hour = '0' + hour
        }
        if( minute <=9 ){
            minute = '0' + minute
        }
        if( second <=9 ){
            second = '0' + second
        }
        let t = year + '-' + month + '-' + day + ' ' + '' + hour + ':' + minute + ':' + second;
        this.setState({
            ip:e.target.value,
            time:t
        });
    }

    handleOk = (e) => {
        let pass = {
            address:this.state.ip,
            id:this.state.dataSource.length + 1,
            key:this.state.dataSource.length,
            create_time:this.state.time,
            status:'未锁定'
        };
        axios.post("http://localhost:3333/addWhiteList", pass
        ).then( (res) => {
            if( document.getElementById("addIp").value == "" ){
                document.getElementById("ip_ps").style.display = 'block';
                return
            }else{
                if( res.data.code == 200 ){
                    this.setState({
                        dataSource:res.data.data,
                        visible: false
                    });
                    document.getElementById("addIp").value = "";
                    document.getElementById("ip_ps").style.display = 'none';
                }
            }
        }).catch( (err) => {
            console.log(err)
        })

        // var a = new Date().toLocaleString();
        // console.log(this.state.time);
        // const { count, dataSource } = this.state;
        // const newData = {
        //     key:count,
        //     id: count,
        //     address:this.state.ip,
        //     create_time:this.state.time
        // };
        //
        // if( document.getElementById("addIp").value == "" ){
        //     document.getElementById("ip_ps").style.display = 'block';
        //     return
        // }else{
        //     this.setState({
        //         dataSource: [...dataSource, newData],
        //         count: count + 1,
        //         visible: false
        //     });
        //     document.getElementById("addIp").value = "";
        //     document.getElementById("ip_ps").style.display = 'none';
        // }

    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
        document.getElementById("addIp").value = "";
        document.getElementById("ip_ps").style.display = 'none';
    }

    //删除
    handleDelete = (key) => {
        let pass = {index:key};
        axios.post("http://localhost:3333/delWhiteList",
            pass
        ).then( (res) => {
            console.log(res);
            if( res.data.code == 200){
                this.setState({ dataSource:res.data.data })
            }
        }).catch( (err) => {
            console.log(err)
        })

        // const dataSource = [...this.state.dataSource];
        // this.setState({
        //     dataSource: dataSource.filter(item => item.key !== key)
        // });

    }

    //锁定
    handleLock(key){
        let pass = { key:key};
        axios.post("http://localhost:3333/lockWhiteList",pass
        ).then( (res) => {
            if( res.data.code == 200 ){
                this.setState({ dataSource:res.data.data })
            }
        }).catch( (err) => {
            console.log(err)
        })
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            address:'192.168.1.45',
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <h2>ip白名单</h2>
                <div className="listbox">
                    <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
                        新增
                    </Button>
                    <Modal
                        width="400px"
                        title="新增白名单"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                    >
                        <input id="addIp" onChange={this.ipChange} defaultValue={this.state.ip} type="text"/>
                        <p id="ip_ps">ip地址不能为空</p>
                    </Modal>
                    <Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                    />
                </div>
            </div>
        );
    }
}



export default Whitelist;
