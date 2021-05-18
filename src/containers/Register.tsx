import React, { SyntheticEvent } from "react";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";
import Column from "../components/Column";
import LoadingWrapper from "../components/LoadingWrapper";
import Row from "../components/Row";
import TextBox from "../components/TextBox";
import UserService from "../services/UserService";

type RegisterProps = {
  signinSuccess: (user: object) => void;
  signinError: (error: string) => void;
  showLoader: () => void;
  hideLoader: () => void;
  isAuthenticated: boolean;
} & RouteComponentProps;

type RegisterState = {
  email: string;
  password: string;
  name: string;
  errorMessage: string | null;
  returnName: string;
};

class Register extends React.Component<RegisterProps, RegisterState> {
  state: RegisterState = {
    email: "",
    password: "",
    name: "",
    errorMessage: "",
    returnName: "",
  };

  register = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();
      console.log(e);

      const { email, password, name } = this.state;
      const { data } = await UserService.register(email, password, name);
      console.log(data);
      this.props.history.push("/login");
      this.setState({ returnName: data.name });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };
  render() {
    if (this.state.returnName) {
      return <Redirect to={"/login"} />;
    }

    return (
      <LoadingWrapper>
        <Row>
          <Column
            size={4}
            classes={
              "offset-md-4 shadow-sm border p-4 text-center rounded mt-5"
            }
          >
            <h2>Register</h2>
            <hr />
            <small className="text-danger">{this.state.errorMessage}</small>
            <form onSubmit={this.register}>
              <TextBox
                placeholder={"Name"}
                type={"text"}
                textChange={(name) => this.setState({ name })}
              />

              <TextBox
                placeholder={"Email"}
                type={"email"}
                textChange={(email) => this.setState({ email })}
              />
              <TextBox
                placeholder={"Password"}
                type={"password"}
                textChange={(password) => this.setState({ password })}
              />

              <button className={"btn btn-success w-100"}>REGISTER</button>
            </form>
          </Column>
        </Row>
      </LoadingWrapper>
    );
  }
}

export default Register;
