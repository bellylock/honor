import React, { Component } from 'react';
import { Card } from "antd";
class AboutMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount(){}
    componentDidMount() {}
    componentWillReceiveProps (newValue){}
    render() {
        return(
            <Card style={{margin :"10px 50px"}}>
                关于我们
            </Card>
        )
    }
}
export default AboutMe;