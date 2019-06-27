import axios from 'axios'
import config from '../config'
import {RequestError} from '../utils/errors'

/**
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 10000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
*/
export default function request(method, url, data) {
    console.log(config.baseUrl + url)
    return new Promise((resolve, reject) => {
        let _option = {
            method,
            url: config.baseUrl + url,
            baseUrl: config.baseUrl,
            timeout: 10000,
            params: null,
            data: data,
            headers: null,
            //withCredentials: true, //是否携带cookie发起请求
            validateStatus: (status)=> {
                return status >= 200 && status < 300
            },
        }
        axios.request(_option).then(res => {
            resolve(typeof res.data === 'object'? res.data:JSON.parse(res.data))
        }, error => {
            console.log(error)
            let _error = new RequestError()
            resolve({
                code: _error.code,
                msg: _error.msg
            })
        })
    })
}
