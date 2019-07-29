import axios from "axios";
import qs from "qs";
import cookie from "react-cookies";
import {notification} from "antd";

axios.defaults.headers.post["Content-Type"] =
    "application/json";
axios.defaults.baseURL = process.env.REACT_APP_URL;
// axios.defaults.changeOrigin = true;
// axios.defaults.withCredentials = true; 
// 超时时间
// axios.defaults.timeout = 5000;
// request拦截器
axios.interceptors.request.use(
    config => {
        //响应头发送form Data类型的数据
        // config.baseURL = "http://10.200.140.182:8080";
        if (cookie.load("httpipId"))
            config.headers.token = cookie.load("httpipId");
        //格式化post请求数据传往后台
        // config.transformRequest = [
        //   function (data) {
        //     return qs.stringify(data);
        //   }
        // ];
        return config;
    },
    error => {
        notification.error({
            message: '提示',
            description: "加载失败",
            duration: 2
        })
        return Promise.resolve(error);
    }
);

// response拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code !== 0 && !response.config.url.includes("/vericode")) {
            notification.warning({
                message: '提示',
                description: response.data.msg,
                duration: 2
            })
        }
        if (response.config.url.includes("/vericode"))
            return response
        else
            return response.data
    },
    error => {
        if (error.response && [401, 403].includes(error.response.status)) {
            window.location.href = "/";
            cookie.remove("httpipId");
        } else if (!navigator.onLine) {
            notification.error({
                message: "请检查网络！",
                duration: 2
            });
        } else {
            notification.error({
                message: "操作失败！",
                duration: 2
            });
        }
        return Promise.reject(error);
    }
);

export default axios;
