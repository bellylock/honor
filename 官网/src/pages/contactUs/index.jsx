import React, {Component} from 'react';
import "./index.styl";
import img from '../../img/location.png'
import { Icon } from 'antd'

class Contactus extends Component {
    componentDidMount(){
        const { BMap, BMAP_STATUS_SUCCESS } = window;
        var map = new BMap.Map("map");
        map.centerAndZoom(new BMap.Point(102.674191,25.037361),17);
        map.enableScrollWheelZoom();
        map.enableKeyboard();
        map.enableDragging();
        map.enableDoubleClickZoom();

        function addClickHandler(target,window){
            target.addEventListener("click",function(){
                target.openInfoWindow(window);
            });
        }

        var markers = [
            {content:"我的备注",title:"我的标记",imageOffset: {width:0,height:3},position:{lat:39.92153,lng:116.39525}},
            {content:"昆明西山区滇池柏悦5栋33楼",title:"昆明晏宇科技",imageOffset: {width:0,height:3},position:{lat:25.037296,lng:102.673454}}
        ];
        for(var index = 0; index < markers.length; index++ ){
            var point = new BMap.Point(markers[index].position.lng,markers[index].position.lat);
            var marker = new BMap.Marker(point,{icon:new BMap.Icon(img,new BMap.Size(30,35),{
                    imageOffset: new BMap.Size(markers[index].imageOffset.width,markers[index].imageOffset.height)
                })});
            var label = new BMap.Label(markers[index].title,{offset: new BMap.Size(25,5)});
            var opts = {
                width: 200,
                title: markers[index].title,
                enableMessage: false
            };
            var infoWindow = new BMap.InfoWindow(markers[index].content,opts);
            marker.setLabel(label);
            addClickHandler(marker,infoWindow);
            map.addOverlay(marker);
        }
    }

    render(){
        return(
            <div className="aboutusbox">
                <div className="container">
                    <div className="aboutcabin">
                        <div className="tit">
                            <h1>联系我们</h1>
                        </div>
                        <div id="map"></div>
                        <div className="details">
                            <p>地址： 昆明市西山区宏盛达滇池柏悦5栋33楼</p>
                            <p>公司电话： 0871-63935390</p>
                            <p>联系人： 达霖</p>
                            <p>联系电话： 18987286593</p>
                            <p>业务 QQ: 178140723</p>
                            <p>网址： www.ynweb.com</p>
                            <p>邮箱： info@ynweb.com</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contactus;
