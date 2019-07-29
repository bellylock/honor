"use strict";
import { action, autorun, observable } from "mobx";
class Store {
  @observable activePath = "";
  @observable userInfo = {
    username:"",
    balance:0,
    vipLevel:0,
  };
  constructor() {
    autorun(() => {
      // console.log(this.supplier,this.menuInfo,this.activePath);
    });
  }
  //路由存储
  @action.bound activePathChange(value) {
    this.activePath = value;
  }
   //路由存储
   @action.bound changeUserInfo(value) {
    this.userInfo = value;
  }
}
const store = new Store() 
export default store;