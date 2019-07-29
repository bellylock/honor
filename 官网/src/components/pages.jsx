
import React from "react";
import { Pagination } from "antd";
class Pages extends React.Component {
    constructor(props) {
        super(props);
    }
    onShowSizeChange=(page, pageSize)=>{
        let data = Object.assign({}, { pageSize ,page })
        this.props.getParamsPage(data);
    }
    onShowIndexChange=(page, pageSize)=>{
        let data = Object.assign({}, { page,pageSize })
        this.props.getParamsPage(data);
    }
    render(){
        const { pageSizeOptions,pageParams} = this.props;
        return (
            <Pagination style={{marginTop:"20px",textAlign:"right"}} showSizeChanger
                showQuickJumper
                pageSize={pageParams.pageSize}   
                onChange={this.onShowIndexChange}
                current ={pageParams.page}
                onShowSizeChange={this.onShowSizeChange}
                pageSizeOptions={pageSizeOptions||["10","20","30","40"]} 
                defaultCurrent={pageParams.page} total={pageParams.total}
                showTotal={(total, range) => `${range[1]==0 ? 0: range[0]}-${range[1]} 条，合计 ${total} 条`} /> 
        )
    }
}
export default Pages;