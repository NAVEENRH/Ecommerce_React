import { TextField } from "@material-ui/core";
import React, { RefObject, SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";


type Props = {};
type State = {
  line1: any;
  line2: any;
  city: any;
  state: any;
  pincode: any
};

class Checkout extends React.Component<Props, State> {
  emailRef: RefObject<HTMLInputElement>;

  state: State = {
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: ""
  };

  constructor(props: any) {
    super(props);
    this.emailRef = React.createRef<HTMLInputElement>();
  }

  saveData = (ev: SyntheticEvent) => {
    ev.preventDefault();
    console.log("Form submitted", this.state, this.emailRef.current?.value);
  }
  
  render() {
    return (
    
      <div className="row">
        <div className="py-5 text-center">
            <h1 className="text-primary">Checkout Form</h1>
        </div>

        <div className="col-md-12 order-md-1">
          <form onSubmit={this.saveData} >
          <div className="row m-5 mt-0">
                <div className="col-md-6  mb-3">
                    <TextField 
                    label="Line1" 
                    type="text" className="form-control form-control-lg" 
                    placeholder="Line1 *" 
                    name="line1" 
                    value={this.state.line1} 
                    onChange={(e)=> this.setState({ line1: e.target.value })} required />
                </div>

                <div className="col-md-6  mb-3">
                    <TextField 
                    label="Line2" 
                    type="text" className="form-control form-control-lg" 
                    placeholder="Line2 *" 
                    name="line2" 
                    value={this.state.line2} 
                    onChange={(e)=> this.setState({ line2: e.target.value })} required 
                    />
                </div>
            </div>

            <div className="row m-5 mt-0">
                <div className="col-md-6  mb-3">
                    <TextField 
                    label="City *"
                    type="text" className="form-control form-control-lg" 
                    placeholder="City *" 
                    name="city" 
                    value={this.state.city} 
                    onChange={(e)=> this.setState({ city: e.target.value })} required />
                </div>

                <div className="col-md-6  mb-3">
                    <TextField 
                    label="State"
                    type="text" className="form-control form-control-lg" 
                    placeholder="State *" 
                    name="state" 
                    value={this.state.state} 
                    onChange={(e)=> this.setState({ state: e.target.value })} required />
                </div>
            </div>

            <div className="row m-5 mt-0">
                <div className="col-md-6  mb-3">
                    <TextField 
                    label="Pincode" 
                    type="text" className="form-control form-control-lg" 
                    placeholder="Pincode *" 
                    name="pincode" 
                    value={this.state.pincode} 
                    onChange={(e)=> this.setState({ pincode: e.target.value })} required />
                </div>
            </div>
            <div className="text-center">
              <NavLink to={"/payment"}>
                <button type="button" className="btn btn-success btn-lg"  >Continue to Payment</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Checkout;
