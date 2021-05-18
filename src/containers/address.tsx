import React, { SyntheticEvent, Fragment } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import Column from "../components/Column";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import ErrorBoundary from "../components/ErrorBoundary";
import ImageWithFallback from "../components/ImageWithFallback";
import TextBox from "../components/TextBox";
import { NavLink } from "react-router-dom";
import UserService from "../services/UserService";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import LoadingActions from "../store/actions/LoadingActions";
import UserActions from "../store/actions/UserActions";
import formatter from "../utils/formatter";
import LoadingWrapper from "../components/LoadingWrapper";
import { StoreType } from "../types";
import Container from "../components/Container";

type RegisterProps = {
  addressError: (error: string) => void;
  errorMessage: string | null;
  showLoader: () => void;
  hideLoader: () => void;
} & RouteComponentProps;
type RegisterState = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: any;
  redirect: boolean;
};
class Add extends React.Component<RegisterProps> {
  state: RegisterState = {
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
    redirect: false,
  };
  submitData = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const { line1, line2, city, state, pincode } = this.state;
      const { data } = await UserService.addressPost(
        line1,
        line2,
        city,
        state,
        pincode
      );
      console.log("address", data);
      this.props.showLoader();
      this.props.hideLoader();
      this.props.history.push("/profile");
      this.setState({
        redirect: true,
        line1: this.state.line1,
        line2: this.state.line2,
        city: this.state.city,
        state: this.state.state,
        pincode: this.state.pincode,
      });
    } catch (e) {
      this.props.addressError(formatter.titlecase(e.message.toString()));
      this.props.hideLoader();
      console.log(e);
    }
  };
  render() {
    const redirecting = () => {
      if (this.state.redirect === true) {
        return <Redirect to="/profile" />;
      }
    };
    console.log("state data", this.state);
    return (
      <Container>
        <Row>
          <Column size={12}>
            <div className="card col-md-6 mx-auto">
              <h1 className="text-center">Add Address</h1>
              <small className="text-danger">{this.props.errorMessage}</small>
              <div className="card-body">
                <form onSubmit={this.submitData}>
                  
                  <TextBox
                    placeholder={"Address1"}
                    type={"text"}
                    textChange={(line1) => this.setState({ line1 })}
                  />
                  <TextBox
                    placeholder={"Address2"}
                    type={"text"}
                    textChange={(line2) => this.setState({ line2 })}
                  />
                  <TextBox
                    placeholder={"city"}
                    type={"text"}
                    textChange={(city) => this.setState({ city })}
                  />
                  <TextBox
                    placeholder={"State"}
                    type={"text"}
                    textChange={(state) => this.setState({ state })}
                  />
                  <TextBox
                    placeholder={"Pincode"}
                    type={"text"}
                    textChange={(pincode) => this.setState({ pincode })}
                  />

                  <button className={"btn btn-dark w-100 text-uppercase"}>
                    Add
                  </button>
                </form>
              </div>
            </div>
          </Column>
        </Row>
      </Container>
    );
  }
}
const mapStoreDataToProps = (storeData: StoreType) => {
  return {
    errorMessage: storeData.userSession.error,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // addressError: (err: string) => dispatch(UserActions.addressError(err)),
    hideLoader: () => dispatch(LoadingActions.hideLoader()),
    showLoader: () => dispatch(LoadingActions.showLoader()),
  };
};
export default connect(mapStoreDataToProps, mapDispatchToProps)(Add);
