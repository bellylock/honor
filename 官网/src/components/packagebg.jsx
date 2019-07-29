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
                    <p style={{fontSize:"40px",color:"#fff"}}>套餐购买</p>
                    <p style={{fontSize:"24px",color:"#fff"}}>多种套餐，更多优惠，满足各领域业务需求，更有技术团队为您量身定制</p>
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