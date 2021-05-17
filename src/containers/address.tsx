import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router';
import Column from '../components/Column'
import Row from '../components/Row'
import StorageService from '../services/StorageService';

type addressState = {
    line1: any;
    line2: any;
    city: any;
    state: any;
    pincode: any;
    redirect: boolean;
}

class address extends React.Component {

    state: addressState = {
        line1: "",
        line2: "",
        city: "",
        state: "",
        pincode: "",
        redirect: false,
    };

    submitting = (e: any) => {
        e.preventDefault();
        const address = {
            line1: this.state.line1,
            line2: this.state.line2,
            city: this.state.city,
            state: this.state.state,
            pincode: this.state.pincode,
        };

        StorageService.getData("token").then((token) =>
            axios.post("http://localhost:5000/address", address, {
                headers: { Authorization: `Bearer ${token}` },
            })
        );
    }

    redirecting = () => {
        if (this.state.redirect) {
            return <Redirect to="/confirmationpage"/>;
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
                            <h2 className="text-primary text-center mb-3">Address Update</h2>
                        </div>

                        <div className="form-content">
                            <form onSubmit={this.submitting}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group m-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Line1 *"
                                                name="line1"
                                                value={this.state.line1}
                                                onChange={this.change}
                                            />
                                        </div>

                                        <div className="form-group m-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Line2 *"
                                                name="line2"
                                                value={this.state.line2}
                                                onChange={this.change}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group m-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="City *"
                                                name="city"
                                                value={this.state.city}
                                                onChange={this.change}
                                            />
                                        </div>

                                        <div className="form-group m-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="State *"
                                                name="state"
                                                value={this.state.state}
                                                onChange={this.change}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group m-3">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Pincode *"
                                                    name="pincode"
                                                    value={this.state.pincode}
                                                    onChange={this.change}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 col-6 mx-auto">
                                    <button className="btn btn-outline-primary btnSubmit m-3 fs-4">Add Address</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default address;
