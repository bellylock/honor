/**
 Simple Server for web api test.
 */
/**Connect是一个node中间件（middleware）框架。
 如果把一个http处理过程比作是污水处理，中间件就像是一层层的过滤网。
 每个中间件在http处理过程中通过改写request或（和）response的数据、状态，实现了特定的功能。
 中间件就是类似于一个过滤器的东西，在客户端和应用程序之间的一个处理请求和响应的的方法。*/

var connect = require('connect');  //创建连接
var bodyParser = require('body-parser');   //body解析
var serveStatic = require('serve-static');   //目录访问（静态文件访问）

let map = new Map();
var data = {
    "code": "200",
    "msg": "success"
};
let array = [];

//用户中心登录
var loginList = {
    "code":"200",
    "msg":"success",
    "data":{
        token:"skey",
        children:[
            {
                username:"howard",
                password:"666",
                key:"888"
            }
        ]
    }
}

//账号管理 获取
var list_accountArrange = {
    "code": "200",
    "msg": "success",
    "data": [
        {
            id:0,
            name: '651101',
            password: 12,
            sty: '测试',
            num: 9,
            date1:'2018-04-23 13:08:32',
            date2:'2018-05-15 18:03:58',
            date3:'2018-05-22 18:03:58',
            sur:"100.00",
            ps:" 正常状态 ",
            status:0,
            remark:"超时",
            checks:false,
            fee:0,
            address:'昆明',
            hour:'1小时'
        },
        {
            id:1,
            name: '651102',
            password: 56,
            sty: '付费',
            num: 18,
            date1:'2018-10-23 09:25:20',
            date2:'2018-10-26 18:03:58',
            date3:'2018-11-22 18:03:58',
            sur:"100.00",
            ps:" 即将到期 ",
            status:1,
            remark:"",
            checks:false,
            fee:0,
            address:'昆明',
            hour:'1小时'
        },
        {
            id:2,
            name: '651103',
            password: 92,
            sty: '测试',
            num: 36,
            date1:'2019-02-23 09:25:20',
            date2:'2019-02-26 18:03:58',
            date3:'2019-02-28 18:03:58',
            sur:"100.00",
            ps:" 已到期 ",
            status:2,
            remark:"",
            checks:false,
            fee:0,
            address:'昆明',
            hour:'1小时'
        }
    ]
};
var arr_accountArrange = [];

//ip白名单 获取
var list_whiteIpList = {
    "code": "200",
    "msg": "success",
    "data": [
        {
            key:'0',
            id:1,
            address: '192.168.1.40',
            create_time: '2019-01-05 10:20:50',
            update_time: '',
            status:'未锁定',
            mark:0,
        }, {
            key:'1',
            id:2,
            address: '192.168.11.22',
            create_time: '2019-02-15 15:10:30',
            update_time: '',
            status:'未锁定',
            mark:0,
        }
    ]
};
let filterArray = [];

function strMapToObj(strMap) {
    let arr = [];
    for (let [k, v] of strMap) {
        let obj = {};
        obj.key = k;
        obj.value = v;
        arr.push(obj);
    }
    return arr;
};

function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
};
var app = connect()
    .use(bodyParser.json())   //JSON解析
    .use(bodyParser.urlencoded({extended: true}))
    .use(serveStatic(__dirname))
    //__dirname 表示当前文件所在的目录的绝对路径
    //__filename 表示当前文件的绝对路径
    //use()方法还有一个可选的路径字符串，对传入请求的URL的开始匹配。
    //use方法来维护一个中间件队列
    .use(function (req, res, next) {
        //跨域处理
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');  //允许任何源
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  //允许任何方法
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Session-Token');   //允许任何类型
        res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});    //utf-8转码
        next();  //next 方法就是一个递归调用
    })

    // honor接口
    //（1）官网接口
    //登录接口
    .use('/user/login', function (req, res, next) {
        var data = {
            "code": "200",
            "msg": "success",
            "data": {token:'logkey'}
        };
        res.end(JSON.stringify(data));
        next();
    })
    //注册接口
    .use('/user/register', function (req, res, next) {
        var data = {
            "code": "200",
            "msg": "success",
        };
        res.end(JSON.stringify(data));
        next();
    })
    // 查询充值类型列表
    .use('/rechargeType/list', function (req, res, next) {
        var data = {
            "code": "200",
            "msg": "success",
            "data": [
                {
                    "id": 1,
                    "rechargeAmount":1000,
                    "actualAmount":1100
                },
                {
                    "id": 2,
                    "rechargeAmount":3000,
                    "actualAmount":3600
                },
                {
                    "id": 3,
                    "rechargeAmount":9000,
                    "actualAmount":13500
                }
            ]
        };
        res.end(JSON.stringify(data));
        next();
    })
    //查询VPN套餐列表
    .use('/vpnPpg/list',function(req,res,next){
        var data = {
            "code":"200",
            "msg":"success",
            "data":[
                {
                    id:1,
                    seq:1,
                    price:"40",
                    activePrice:"55",
                    name:"按周购买",
                    list:[
                        "7天使用时长",
                        "多协议连接",
                        "全国线路任选",
                        "多平台支持",
                        "海量优质IP",
                        "极速独享带宽",
                        "单地区混播随意使用",
                        "电脑手机模拟器随意切换使用",
                        1

                    ]
                },
                {
                    id:2,
                    seq:2,
                    price:"120",
                    name:"按月购买",
                    activePrice:"230",
                    list:[
                        "30天使用时长",
                        "多协议连接",
                        "全国线路任选",
                        "多平台支持",
                        "海量优质IP",
                        "极速独享带宽",
                        "单地区混播随意使用",
                        "电脑手机模拟器随意切换使用",
                        1
                    ]
                },
                {
                    id:3,
                    seq:3,
                    price:"240",
                    name:"按季度购买",
                    activePrice:"600",
                    list:[
                        "90天使用时长",
                        "多协议连接",
                        "全国线路任选",
                        "多平台支持",
                        "海量优质IP",
                        "极速独享带宽",
                        "单地区混播随意使用",
                        "电脑手机模拟器随意切换使用",
                        1
                    ]
                }
            ]
        };
        res.end(JSON.stringify(data));
        next();
    })
    //服务器地址
    .use('/domain/info', function (req, res, next) {
        var data = {
            "code": "200",
            "msg": "success",
            "user":null,
            "data": [
                {
                    name:"江西省",
                    children:[
                        {
                            available: 15,
                            city: "上饶市",
                            host: "srs.ryip.cn",
                            ok: "1",
                            province: "江西省",
                            t1: "361100",
                            t2: "电信",
                            t3: "360000",
                            total: 15
                        },
                        {
                            available: 7,
                            city: "九江市",
                            host: "jjs.ryip.cn",
                            ok: "1",
                            province: "江西省",
                            t1: "360400",
                            t2: "电信",
                            t3: "360000",
                            total: 7
                        }
                    ]
                },
                {
                    name:"重庆",
                    children:[
                        {
                            available: 15,
                            city: "江津市",
                            host: "srs.ryip.cn",
                            ok: "0",
                            province: "重庆",
                            t1: "361100",
                            t2: "联通",
                            t3: "360000",
                            total: 15
                        }
                    ]
                }
            ]
        };
        res.end(JSON.stringify(data));
        next();
    })
    // 购买ip套餐
    .use('/user/ip/ppg', function (req, res, next) {
        var data = {
            "code": "200",
            "msg": "success",
            "data": [
                {
                    id:1,
                    name:'5分钟~15分钟套餐',
                    price:0.01,
                    day_num:1000,
                    day_num_status:1,
                    buy_duration:['一天','一周','一月'],
                    steady_duration:'5分钟-15分钟',
                    max_ip_num:200,
                    ip_available_rate:'99%',
                    anonymity:'高',
                    api_rate:'1s',
                    h1:'HTTP/HTTPS/SCOKS5',
                    h2:'多机器调用',
                    getnumstatus:0,
                    purchase_status:1,
                    pri_status:1
                },
                {
                    id:2,
                    name:'按次购买',
                    price:1500,
                    get_num:5000,
                    day_num:'不限',
                    day_num_status:0,
                    steady_duration:'5分钟-15分钟',
                    max_ip_num:200,
                    ip_available_rate:'99%',
                    anonymity:'高',
                    api_rate:'1s',
                    getnumstatus:1,
                    h1:'HTTP/HTTPS/SCOKS5',
                    h2:'多机器调用',
                    purchase_status:0,
                    pri_status:0
                },
                {
                    id:3,
                    name:'长效IP',
                    price:'待定',
                    steady_duration:'48小时',
                    anonymity:'高',
                    support:'HTTP',
                    h3:'建设中...',
                    getnumstatus:0,
                    setting:true,
                    purchase_status:0,
                    pri_status:0
                }
            ]
        };
        res.end(JSON.stringify(data));
        next();
    })
    //（2）用户中心接口
    //公告
    .use('/notice', function (req, res, next) {
        var data = {
            "code": "200",
            "msg": "success",
            "data": [
                {
                    num:"5-2",
                    place:"新上地区",
                    size:"中山电信"
                },
                {
                    num:"5-3",
                    place:"新上地区",
                    size:"中山电信"
                },
                {
                    num:"5-6",
                    place:"新上地区",
                    size:"中山电信"
                },
                {
                    num:"5-11",
                    place:"新上地区",
                    size:"中山电信"
                },
                {
                    num:"5-12",
                    place:"新上地区",
                    size:"中山电信"
                },
                {
                    num:"5-15",
                    place:"新上地区",
                    size:"中山电信"
                }
            ]
        };
        res.end(JSON.stringify(data));
        next();
    })
    //服务器列表
    .use('/serverList',function(req,res,next){
        var data = {
            "code":"200",
            "msg":"success",
            "data":[
                //第一组 混拨
                {
                    name:'混拨',
                    data:[
                        {
                            vice:'全国混拨',address:'shh.ipzuiduo.net',status:1  /* status = 1 ---> 正常运行 */
                        },
                        {
                            vice:'全国混拨1',address:'hb1.ipzuiduo.net',status:2  /* status = 2 ---> 维护中 */
                        },
                        {
                            vice:'全国混拨2',address:'hb2.ipzuiduo.net',status:1
                        }
                    ]
                },
                //第二组 山西省
                {
                    name:'山西省',
                    data:[
                        {
                            vice:'忻州联通',address:'sxxzlt.ipzuiduo.net',statu:'正常运行',status:1
                        },
                        {
                            vice:'朔州联通',address:'sxszlt.ipzuiduo.net',statu:'正常运行',status:1
                        },
                    ]
                },
                {
                    name:'重庆',
                    data:[
                        {
                            vice:'重庆电信',address:'cqdx.ipzuiduo.net',statu:'正常运行',status:1
                        }
                    ]
                },
                {
                    name:'上海',
                    data:[
                        {
                            vice:'上海联通',address:'shlt.ipzuiduo.net',statu:'正常运行',status:1
                        }
                    ]
                },
                {
                    name:'天津',
                    data:[
                        {
                            vice:'天津电信',address:'tjdx.ipzuiduo.net',statu:'正常运行',status:1
                        }
                    ]
                },
                {
                    name:'山东省',
                    data:[
                        {
                            vice:'菏泽联通',address:'sdhzlt.ipzuiduo.net',statu:'维护中',status:2
                        },
                        {
                            vice:'淄博电信',address:'sdzbdx.ipzuiduo.net',statu:'正常运行',status:1
                        },
                        {
                            vice:'威海电信',address:'sdwhdx.ipzuiduo.net',statu:'正常运行',status:1
                        },
                        {
                            vice:'烟台电信',address:'sdytdx.ipzuiduo.net',statu:'正常运行',status:1
                        },
                        {
                            vice:'滨州电信',address:'sdbzdx.ipzuiduo.net',statu:'正常运行',status:1
                        },
                        {
                            vice:'枣庄联通',address:'sdzzlt.ipzuiduo.net',statu:'正常运行',status:1
                        },
                        {
                            vice:'潍坊联通',address:'sdwflt.ipzuiduo.net',statu:'正常运行',status:1
                        },
                        {
                            vice:'莱芜电信',address:'sdlwdx.ipzuiduo.net',statu:'正常运行',status:1
                        },
                        {
                            vice:'泰安电信',address:'sdtadx.ipzuiduo.net',statu:'正常运行',status:1
                        }
                    ]
                }
            ]
        };
        res.end(JSON.stringify(data));
        next();
    })
    //账号管理 获取接口
    .use('/accountArrange', function (req, res, next) {
        res.end(JSON.stringify(list_accountArrange));
        next();
    })
    //账号管理 删除接口
    .use('/delAccountArrange', function(req, res, next) {
        // arr.push({type:req.body.type,name:req.body.name});
        // var data = {"code":200,"msg":"success",result:arr};

        if( req.method == "POST" ){
            // let index = '';
            // console.log('内容'+req.body);
            // index = req.body;
            // console.log(index);

            console.log(req.body.need);
            let i = req.body.need;
            list_accountArrange.data.splice(i,1);
            res.end(JSON.stringify(list_accountArrange))
        }else{
            res.end(JSON.stringify());
        }
        next();
    })
    //账号管理 修改接口
    .use('/editAccountArrange', function(req, res, next) {
        if( req.method == "POST" ){
            console.log(req.body);
            let i = req.body.index;
            let name = req.body.name;
            let psw = req.body.psw;
            let remark = req.body.remark;
            list_accountArrange.data[i].name = name;
            list_accountArrange.data[i].password = psw;
            list_accountArrange.data[i].remark = remark;
            res.end(JSON.stringify(list_accountArrange))
        }else{
            res.end(JSON.stringify());
        }
        next();
    })
    //使用记录
    .use('/recordOfUse', function (req, res, next) {
        var data = {
            "code": "200",
            "msg": "success",
            "data": [
                {
                    key: '1',
                    num:1,
                    sty: 'http',
                    name: 'John Brown',
                    way: '按次提取',
                    amount:148,
                    time:'2019-01-25 10:08:20'
                }, {
                    key: '2',
                    num:2,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:256,
                    time:'2019-02-01 10:08:20'
                }, {
                    key: '3',
                    num:3,
                    sty: 'http',
                    name: 'John Brown',
                    way: '按次提取',
                    amount:1,
                    time:'2019-02-17 10:08:20'
                }, {
                    key: '4',
                    num:4,
                    sty: 'http',
                    name: 'John Brown',
                    way: '按次提取',
                    amount:569,
                    time:'2019-02-27 10:08:20'
                }, {
                    key: '5',
                    num:5,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '6',
                    num:6,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '7',
                    num:7,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '8',
                    num:8,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '9',
                    num:9,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '10',
                    num:10,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '11',
                    num:11,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '12',
                    num:12,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '13',
                    num:13,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '14',
                    num:14,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }, {
                    key: '15',
                    num:15,
                    sty: 'http',
                    name: 'John Brown',
                    way: '套餐提取',
                    amount:1635,
                    time:'2019-03-17 10:08:20'
                }
            ]
        };
        res.end(JSON.stringify(data));
        next();      //
    })
    //ip白名单 获取
    .use('/whiteIpList', function (req, res, next) {
        res.end(JSON.stringify(list_whiteIpList));
        next();
    })
    //ip白名单删除
    .use('/delWhiteList', function(req, res, next) {
        if( req.method == "POST" ){
            let key = req.body.index;
            let ele = list_whiteIpList.data.filter( item =>
                item.key == key
            )
            let child = ele[0];
            let i = list_whiteIpList.data.indexOf(child);
            list_whiteIpList.data.splice(i,1);
            res.end(JSON.stringify(list_whiteIpList))
        }else{
            res.end(JSON.stringify());
        }
        next();
    })
    //ip白名单添加
    .use('/addWhiteList', function(req, res, next) {
        if( req.method == "POST" ){
            let address = req.body.address;
            let id = req.body.id;
            let create_time = req.body.create_time;
            let key = req.body.key;
            let status = req.body.status;
            list_whiteIpList.data.push({key:key,id:id,address:address,create_time:create_time,status:status});
            res.end(JSON.stringify(list_whiteIpList))
        }else{
            res.end(JSON.stringify());
        }
        next();
    })
    //ip白名单 锁定
    .use('/lockWhiteList', function(req, res, next) {
        if( req.method == "POST" ){
            let key = req.body.key;
            let ele = list_whiteIpList.data.filter( item =>
                item.key == key
            )
            let child = ele[0];
            let i = list_whiteIpList.data.indexOf(child);
            if( list_whiteIpList.data[i].mark == 1 ){
                list_whiteIpList.data[i].status = "未锁定";
                list_whiteIpList.data[i].mark = 0
            }else{
                list_whiteIpList.data[i].status = "锁定";
                list_whiteIpList.data[i].mark = 1
            }
            res.end(JSON.stringify(list_whiteIpList))
        }else{
            res.end(JSON.stringify());
        }
        next();
    })
    //财务日志
    .use('/financeDiary', function (req, res, next) {
        var data = {
            "code": "200",
            "msg": "success",
            "data": [
                {
                    key: '1',
                    bef_money: 75369,
                    surplus: 14852.00,
                    info:'账号续费：6511',
                    time:'2016-10-06 18:03:05',
                    cost:[{status:0,value:"+35"}]
                }, {
                    key: '2',
                    bef_money: 75369,
                    surplus: 14852.00,
                    info:'开户：5462',
                    time:'2016-10-06 18:03:05',
                    cost:[{status:1,value:"-22"}]
                }, {
                    key: '3',
                    bef_money: 75369,
                    surplus: 14852.00,
                    info:'账号续费：6511',
                    time:'2016-10-06 18:03:05',
                    cost:[{status:0,value:"+11"}]
                }
            ]
        };
        res.end(JSON.stringify(data));
        next();
    })
    //用户中心登录
    .use('/userLogin', function (req, res, next) {
        res.end(JSON.stringify(loginList));
        if( req.method == "POST" ){
            let name = req.body.username;
            let psw = req.body.password;
            console.log(name+ "--" + psw);
            // let loglist = new Map();
            // loglist.set(loginList.data.children);
            // console.log("loglist" + loglist);
        }else{
            res.end(JSON.stringify());
        }
        next();
    })
    .listen(3333);
console.log('Server started on port 3333.');
