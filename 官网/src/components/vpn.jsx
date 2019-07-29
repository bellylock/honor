import React, { Component } from 'react';
import {Carousel} from "antd";
class Carousels extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount(){}
    componentDidMount() {}
    // componentWillReceiveProps (newValue){}
    render() {
        const { imgeArr } = this.props;
        const imgCarousel = imgeArr.map((item,index)=>(
           <div key={index} style={{position:"relative"}}>
                <img src={item} style={{width:"100%"}}/>
               
                <div style={{position:"absolute",top:"50px",left:"30%",textAlign:"center"}}>
                    <p style={{fontSize:"40px",color:"#fff"}}>VPN套餐</p>
                    <p style={{fontSize:"24px",color:"#fff"}}>节约成本，增强安全，易扩展，完全控制主动权，安全的ip地址</p>
                </div>
            
            </div>
        ))
        return(
            <Carousel autoplay effect="fade">
                {imgCarousel}
                
            </Carousel>
        )
    }
}
export default Carousels;