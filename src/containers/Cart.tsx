import { IconButton } from "@material-ui/core";
import { Component } from "react";
import { connect } from "react-redux";
import { Link, NavLink, RouteComponentProps } from "react-router-dom";
import Column from "../components/Column";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import { CartType, StoreType } from "../types";
import formatter from "../utils/formatter";
import Container from "../components/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import "../index";

type Props = {
  cart: CartType[];
} & RouteComponentProps;

type State = {
  count: number;
  deleteCartData: any;
  quantity: any;
};

class Cart extends Component<Props, State> {
  state: State = {
    count: 0,
    deleteCartData: this.props.cart,
    quantity: 0,
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  deleteItem = () => {
    console.log(this.props.cart);
    const deleteData = this.props.cart;
    deleteData.pop();
    this.setState({
      deleteCartData: deleteData,
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Column size={12}>
            <div className="jumbotron text-center">
              <h3 className="display-5 fs-1 fw-normal">Cart Item</h3>
            </div>
          </Column>
        </Row>

        <Row>
          {this.props.cart.map((val) => (
            <Column
              size={8}
              classes={
                "d-flex justify-content-between align-items-center mt-1 shadow-lg ms-4 h-75 w-50 mb-3"
              }
            >
              <Link to={`/productdetail/${val.productId}`}>
                <ImageWithFallback
                  source={val.productImage}
                  classes={"w-75 h-75 img-thumbnail rounded float-start"}
                />
              </Link>
              <div className="d-flex align-items-start flex-column">
                <h5 className={"mt-4"}>
                  {formatter.titlecase(val.productName)}
                </h5>
                <p className="mt-2 text-dark ">
                  SalePrice: {val.productSalePrice}
                </p>
                <p className="mt-2 text-danger">Stock: {val.productStock}</p>
                <p className="mt-2 text-success">Price: {val.productPrice}</p>
              </div>
              <div className="btn d-flex align-items-start flex-column">
                <div className="d-flex mb-5">
                  <button
                    className="btn btn-primary m-2"
                    onClick={this.decrement}
                  >
                    -
                  </button>
                  <h1>{this.state.count}</h1>
                  <button
                    className="btn btn-danger m-2"
                    onClick={this.increment}
                  >
                    +
                  </button>
                </div>
                <button className="btn btn-danger p-1">
                  <DeleteIcon
                    className="btn-danger"
                    onClick={this.deleteItem}
                  />
                </button>
              </div>
            </Column>
          ))}
        </Row>
        <NavLink to={"/checkout"}>
          <div className="d-grid">
            <button className="btn btn-primary btn-lg" type="button">
              Proceed To CheckOut
            </button>
          </div>
        </NavLink>
      </Container>
    );
  }
}

const mapStateToProps = (state: StoreType) => {
  return {
    cart: state.cart,
  };
};
export default connect(mapStateToProps)(Cart);
