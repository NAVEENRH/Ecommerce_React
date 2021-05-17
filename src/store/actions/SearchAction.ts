const ActionTypes = {
    SEARCH_NAME: '',

};
const updateSearch = (searchField: any) => {
    return {
        type: ActionTypes.SEARCH_NAME,
        searchField,
    }
}


export default { updateSearch, ActionTypes }