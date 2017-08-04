import {createReducer} from '../../../utils/util'
import types from '../type/types'
import InitState from './homeInitState'

export default createReducer(new InitState, {
    [`${types.GET_HAO_DAN_KU_CID}_SUCCESS`]: (state, data) => {
        return state.set('haoDanCid', data);
    },

    [`${types.GET_PAO_DAN}_SUCCESS`]: (state, data) => {
        return state.set('paoDan', data);
    },

    [`${types.GET_REN_GONG_CID}_SUCCESS`]: (state, data) => {
        return state.set('renGongCid', data);
    },

    [`${types.GET_ZI_XUAN}_SUCCESS`]: (state, data) => {
        return state.set('ziList', data);
    },
});