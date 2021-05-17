import axios from "axios";
import React from "react";
// import { useHistory } from "react-router";
import { BrowserRouter, NavLink, Redirect, useHistory } from "react-router-dom";
import Login from "./Login";

type RegisterState = {
    email: any;
    name: any;
    password: any;
    confirmpassword: any;
    redirect: boolean;
};
class Register extends React.Component {
    state: RegisterState = {
        email: "",
        name: "",
        password: "",
        confirmpassword: "",
        redirect: false,
    };

    submitting = (e: any) => {
        e.preventDefault();

        if (this.state.confirmpassword == this.state.password) {
            const user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
            };
            axios.post("http://localhost:5000/auth/register", user).then(
                (response) => console.log(response.status === 201)
                // history.state("/login")
            );
            this.setState({ redirect: true });
        }
    };

    redirecting = () => {
        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }
    };

    change = (event: any) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="cards">
            <div className="container register-form">
                {this.redirecting()}
                <div className="form">
                    <div className="note">
                        <h2 className="text-primary text-center mb-3">Registration Page</h2>
                    </div>

                    <div className="form-content">
                        <form onSubmit={this.submitting}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group m-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Name *"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.change}
                                        />
                                    </div>
                                    <div className="form-group m-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Email Id *"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.change}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group m-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Your Password *"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.change}
                                        />
                                    </div>
                                     <div className="form-group m-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm Password *"
                                            name="conformpassword"
                                            value={this.state.confirmpassword}
                                            onChange={this.change}
                                        /> 

                                         {this.state.confirmpassword ===
                                            this.state.password ? null : (
                                            <p>Password is not Matching</p>
                                        )}
                                     </div> 
                                </div>
                            </div>
                            <div className="d-grid gap-2 col-6 mx-auto">
                              <button className="btn btn-outline-primary btnSubmit m-3 fs-4">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Register;