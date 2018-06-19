import * as actions from './actions';
import * as getters from './getters';

import {
    SET_TABS,
    SET_CURRENT_TAB,
    SET_NEW_TAB,
    SET_DATA_IN_TAB,
    SET_NEW_ITEM,
    CHANGE_TAB
} from './mutation-types';

const initialState = {
    tabsData: [],
    currentTab: '',
};

const mutations = {
    [SET_TABS](state, payload) {
        state.tabsData.splice(0, state.tabsData.length, ...payload);
    },
    [SET_CURRENT_TAB](state, payload) {
        state.currentTab = payload;
    },
    [SET_NEW_TAB](state, payload) {
        state.tabsData.push(payload);
    },
    [SET_DATA_IN_TAB](state, payload) {
        let { item, index} = payload;

        state.currentTab.tabItems.splice(index, 1, item);

        let tempTabItems = [];
        state.currentTab.tabItems.forEach((item, index, arr) => {
            let prevTotal = index == 0 ? 0  : tempTabItems[index-1].totalSumm;
            let fixCurrent = +item.amount + ((+item.amount/100 * +item.percentage) * +item.duration);

            let obj = {
                month: item.month,
                amount: +item.amount,
                percentage: +item.percentage,
                duration: +item.duration,
                currentSumm:+fixCurrent,
                totalSumm: +fixCurrent + +prevTotal + +item.addSumm,
                addSumm: +item.addSumm
            };
            tempTabItems.push(obj);
        });
        state.currentTab.tabItems = [];
        state.currentTab.tabItems.push(...tempTabItems);
        localStorage.removeItem('tables');
        localStorage.setItem('tables', JSON.stringify(state.tabsData));
    },
    [SET_NEW_ITEM](state, payload) {
        state.currentTab.tabItems.push(payload);
        let tempTabItems = [];
        state.currentTab.tabItems.forEach((item, index, arr) => {
            let prevTotal = index == 0 ? 0  : arr[index-1].totalSumm;
            let fixCurrent = +item.amount + ((+item.amount/100 * +item.percentage) * +item.duration);

            let obj = {
                month: item.month,
                amount: +item.amount,
                percentage: +item.percentage,
                duration: +item.duration,
                currentSumm: +fixCurrent,
                totalSumm: +fixCurrent + +prevTotal + +item.addSumm,
                addSumm: +item.addSumm
            };
            tempTabItems.push(obj);
        });
        state.currentTab.tabItems = [];
        state.currentTab.tabItems.push(...tempTabItems);
        localStorage.removeItem('tables');
        localStorage.setItem('tables', JSON.stringify(state.tabsData));
    },
    [CHANGE_TAB](state, payload) {
        console.log(payload);
    }
};

export default {
    state: { ...initialState },
    actions,
    getters,
    mutations,
};