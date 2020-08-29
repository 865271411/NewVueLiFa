import axios from 'axios'
import ElementUI from 'element-ui'

axios.defaults.baseURL = 'http://localhost:8081/lifamanagement'

//前置拦截器
axios.interceptors.request.use(config => {
    return config
})

//后置拦截器（响应阶段）
axios.interceptors.responce.use(response => {
    let res = response.data
    //正常响应
    if(res.code === 200) {
        return Promise.resolve(response)
    } else {
        //400等其他问题
        ElementUI.Message.error(reg.msg)
        return Promise.reject(response)
    }
},
error => {
    console.log('xxxxx: ' + error.message)
    return Promise.reject(error)
}
)