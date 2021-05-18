import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Column from "../components/Column";
import { CartType, StoreType } from "../types";
import { NavLink, Redirect, RouteComponentProps } from "react-router-dom";
import Container from "../components/Container";
import Row from "../components/Row";
import { Dispatch } from "redux";
import CartActions from "../store/actions/CartActions";

type Props = {
  cartItems: CartType[];
  deleteCartData: (id: number) => void;
  increamentQty: (id: number) => void;
  decrementQty: (id: number) => void;
} & RouteComponentProps;
type State = {
  reRender: boolean;
  totalAmo: number;
};

class Cart extends React.Component<Props, State> {
  state: State = { reRender: false, totalAmo: 0 };

  render() {
    console.log("total", this.state.totalAmo);
    const redirecting = () => {
      if (this.state.reRender === true) {
        return <Redirect to="/checkout" />;
      }
    };

    let fianlPrice: number = 0;
    return (
      <Container>
        <Row>

          <h1 className="fs-3 fw-bold text-light bg-secondary text-center offset-md-3 col-md-6 shadow-lg p-2 rounded-3 mb-4">
            CART ITEMS
            </h1>

          <Column size={8}>
            <div className="container  shadow-lg">
              {redirecting()}
              <div className="items">
                <table className="table">
                  <tbody>
                    {this.props.cartItems.map((data: any, index: number) =>
                      data.productQty > 0 ? (
                        <tr key={data.productId}>
                          <div className="">
                            <td>
                              <img
                                src={data.productImage}
                                className="col-md-3"
                                alt="img"
                              />
                            </td>
                          </div>
                          <th className="fw-bold display-7" scope="row">
                            {index + 1}
                          </th>
                          {/* <td className=" display-7">{data.productId}</td> */}
                          <td className="fw-bold display-7">{data.productName}</td>
                          <td className="fw-bold display-7">
                            S.Price {data.productSalePrice}
                          </td>
                          <td className="d-flex">
                            <button
                              className="btn btn-secondary m-1"
                              onClick={() =>
                                this.props.decrementQty(data.productId)
                              }
                            >
                              -
                        </button>
                            <span className="fw-bold">{data.productQty}</span>
                            <button
                              className="btn btn-secondary m-1"
                              onClick={() =>
                                this.props.increamentQty(data.productId)
                              }
                            >
                              +
                        </button>
                          </td>
                          <td className="fw-bold display-7">
                            Total {data.productSalePrice * data.productQty}
                            <p style={{ display: "none" }}>
                              {
                                (fianlPrice =
                                  fianlPrice +
                                  data.productSalePrice * data.productQty)
                              }
                            </p>
                          </td>

                          <td>
                            <div className="mt-5 pb-0 mb-1 rounded ">
                              <button
                                className="btn btn-secondary fw-bold"
                                onClick={() => {
                                  this.props.deleteCartData(data.productId);
                                }}
                              >
                                <i className="fas fa-trash display-7"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Column>
          <Column size={4}>
            <div className="card-body border  shadow-lg w-50 bg-secondary">
              <h5 className={"totalProductPrice fw-bold"}>
                Sub-Total : <b className="text-light"> {fianlPrice}</b>
              </h5>
              <h5 className="fw-bold">Tax: 00.00</h5>
              <h5 className={"totalProductPrice fw-bold"}>
                Total : <b className="text-light"> {fianlPrice}</b>
              </h5>
            </div>
            <br />
            <NavLink to={"/payment"}>
              <button className="fas fa-shopping-cart bg-secondary p-3 text-light w-50 rounded-3 ">
                CHECK OUT
              </button>
            </NavLink>
            <br />
          </Column>
        </Row>
      </Container>
    );
  }
}

const mapStoreToProps = (state: StoreType) => {
  return {
    cartItems: state.cart,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteCartData: (id: number) => dispatch(CartActions.removeItem(id)),
    increamentQty: (id: number) => dispatch(CartActions.increaseQty(id)),
    decrementQty: (id: number) => dispatch(CartActions.decrementQty(id)),
  };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Cart);
