import api from '../api/api'
import {actions, store} from '../redux/configure'
import * as types from '../redux/types'

export default function init() {
    //test()
    //test2()
}

async function test() {
    let result = await api.record_list(0)
    console.log(result)
}

function test2() {
    store.dispatch({type: types.record_list, payload: [0]})
}