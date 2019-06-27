
/// 全局函数

/// 本地存储

export const setStore = (name, content) => {
  	if (!name) return
  	if (typeof content !== 'string') {
    	content = JSON.stringify(content)
  	}
  	storage.setItem(name, content)
}

export const getStore = name => {
  	if (!name) return
  	return storage.getItem(name)
}

const storage = new Storage({
    size: 1000, //maximum capacity, default 1000
    storageBackend: window.localStorage, //Use AsyncStorage for RN, or window.localStorage for web
    //defaultExpires: 1000 * 3600 * 24, //expire time, default 1 day(1000 * 3600 * 24 milliseconds)
    enableCache: true, //cache data in the memory, default is true
    sync: { 
        // if data was not found in storage or expired, the corresponding sync method will be invoked and return the lasted data
        // update data from remote api
    }
})