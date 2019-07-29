import React, {Component} from 'react';
import "./index.styl";
import { Icon } from 'antd'

class Progress extends Component {
    render(){
        return(
            <div className="progress">
                <div className="context">
                    <img className='warnpic' src={require("@/img/warning.png")}/>
                    <span className='tip'>抱歉，该内容还在建设中</span>
                </div>
            </div>
        )
    }
}

export default Progress;