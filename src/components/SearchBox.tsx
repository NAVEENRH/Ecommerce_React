import React, { useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { StoreType } from "../types";
import SearchAction from "../store/actions/SearchAction";
type Props = {
  updateSearch: (searchField: any) => void;
};

class SearchBox extends React.Component<Props> {
  render() {
    return (
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => this.props.updateSearch(e.target.value)}
        />
      </form>
    );
  }
}

const mapStateToProps = (store: StoreType) => {
  return {
    search: store.search,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateSearch: (searchField: any) =>
      dispatch(SearchAction.updateSearch(searchField)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);