import types from '../type/types'
import api from '../../../api'

const getHaoDanKuCidAPI = '/TaoKeAction.php?act=getHaoDanKuCid';
const getPaoDanAPI = '/TaoKeAction.php?act=paoLiang';
const getJingXuanListAPI = '/TaoKeAction.php?act=getJingXuanCid';
const getZiXuanAPI='/TaoKeAction.php?act=getZiXuan';

export function getHaoDanKuCid() {
    return function (dispatch) {
        return api.get(getHaoDanKuCidAPI)
            .then(response => {
                dispatch(getHaoDanKuCidSuccess(response));
            }, error => {
                console.log(error);
            })
    }
}
export function getHaoDanKuCidSuccess(data) {
    return {
        type: `${types.GET_HAO_DAN_KU_CID}_SUCCESS`,
        payload: {
            data: data
        }
    }
}

export function getPaoDan(requestData) {
    return function (dispatch) {
        return api.get(getPaoDanAPI,
            {
                params: {
                    limit: requestData.limit,
                    pageIndex: requestData.pageIndex,
                }
            })
            .then(response => {
                dispatch(getPaoDanSuccess(response));
            }, error => {
                console.log(error);
            })
    }
}
export function getPaoDanSuccess(data) {
    return {
        type: `${types.GET_PAO_DAN}_SUCCESS`,
        payload: {
            data: data
        }
    }
}

export function getJingXuanCid() {
    return function (dispatch) {
        return api.get(getJingXuanListAPI)
            .then(response => {
                dispatch(getJingXuanCidSuccess(response));
            }, error => {
                console.log(error);
            })
    }
}
export function getJingXuanCidSuccess(data) {
    return {
        type: `${types.GET_REN_GONG_CID}_SUCCESS`,
        payload: {
            data: data
        }
    }
}

export function getZiXuan(requestData) {
    return function (dispatch) {
        return api.get(getZiXuanAPI,{
            params: {
                limit: requestData.limit,
                pageIndex: requestData.pageIndex,
            }
        })
            .then(response => {
                dispatch(getZiXuanSuccess(response));
            }, error => {
                console.log(error);
            })
    }
}
export function getZiXuanSuccess(data) {
    return {
        type: `${types.GET_ZI_XUAN}_SUCCESS`,
        payload: {
            data: data
        }
    }
}