import Vue from 'vue'
import dayjs from 'dayjs'
Vue.filter('foreTime',(data)=>{
    // console.log(new Date().getTime())
    
    return dayjs(data).format("mm:ss")
})
Vue.filter('formatYear',(data)=>{
    // console.log(new Date().getTime())
    
    return dayjs(data).format("YYYY-MM-DD HH:mm:ss")
})
Vue.filter('formatExclueTime',(data)=>{
    // console.log(new Date().getTime())
    
    return dayjs(data).format("YYYY-MM-DD")
})
Vue.filter("filterWang",data=>{
    return Math.ceil(data/1000)+'万'
})