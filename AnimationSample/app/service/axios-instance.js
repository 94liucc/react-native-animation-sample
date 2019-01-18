import axios from 'axios'
const instance =axios.create({
    timeout:15000,
    baseURL:'http://192.168.42.253:8080',
    // baseURL:'http://54.183.10.49:9000/v2',
    // headers:{'Authorization':'123456'}
})
instance.interceptors.request.use(function(config){
    return config
},function(error){
    return Promise.reject(error)
})
export default instance