import { take, put, call, fork, all, takeLatest, takeEvery } from 'redux-saga/effects'
import * as types from './types'
import api from '../api/api'

function* record_list({payload}) {
    if (!payload) { return }
    console.log(payload)
    const page = payload[0]

    let list = yield call(api.record_list, page)
    yield put({
        type: types.record_list,
        records: list
    })
}

export default function* sagas() {
    yield all([
        takeLatest(types.record_list, record_list)
    ])
}

