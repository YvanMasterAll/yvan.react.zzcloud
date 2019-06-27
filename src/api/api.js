import request from './request'

class API {
  
    /// 借书记录列表
    async record_list(page) {
        return await request('post', '/record/' + page, {})
    }
}

export default new API()