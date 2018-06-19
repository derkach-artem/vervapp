import {
    SET_TABS,
    SET_CURRENT_TAB,
    SET_NEW_TAB,
    SET_DATA_IN_TAB,
    SET_NEW_ITEM,
    CHANGE_TAB
} from './mutation-types';

export function setTabs({ commit }, payload) {
    commit(SET_TABS, payload);
}

export function setCurrentTab({ commit }, payload) {
    commit(SET_CURRENT_TAB, payload);
}

export function setNewTab({ commit }, payload) {
    commit(SET_NEW_TAB, payload);
}

export function setDdataInCurrentTab({ commit }, payload) {
    commit(SET_DATA_IN_TAB, payload);
}

export function setNewItem({ commit }, payload) {
    commit(SET_NEW_ITEM, payload);
}

export function changeTab({ commit }, payload) {
    commit(CHANGE_TAB, payload);
}