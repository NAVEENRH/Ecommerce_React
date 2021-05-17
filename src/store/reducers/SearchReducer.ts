import { AnyAaaaRecord } from 'dns';
import { Action } from 'redux';

import SearchAction from '../actions/SearchAction'

type IAction = {
    searchField: any;
} & Action

function SearchReducer(store = '', action: IAction) {
    switch (action.type) {
        case SearchAction.ActionTypes.SEARCH_NAME:
            return action.searchField
        default:
            return store;
    }
}


export default SearchReducer;