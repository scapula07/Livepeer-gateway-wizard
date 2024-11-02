import {atom} from "recoil"

export const userStore=atom({
   key:"userStore",
   default:{} 
})


export const gatewayStore=atom({
   key:"gatewayStore",
   default:{}
})