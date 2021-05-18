import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import ErrorBoundary from "../components/ErrorBoundary";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { CartType, ProductType, StoreType } from "../types";

type Props = {
  cart: CartType[];
  count: number;
} & RouteComponentProps;
type State = {
  orderData: ProductType[];
};
class ProductDetail extends React.Component<Props, State, RouteComponentProps> {
  state: State = {
    orderData: [],
  };
  async componentDidMount(): Promise<void> {
    try {
      const params: any = this.props.match.params;
      const { data } = await ProductService.getProductById(params.id);

      console.log("success", data);
      this.setState({
        orderData: [data],
      });
    } catch (e) {
      console.log("error", e);
    }
  }
  render() {
    return (
      <ErrorBoundary>
        <Row>
          <div className="header fs-3 fw-bold bg-dark text-light col-6 offset-3 text-center">Product Details</div>
          {this.state.orderData.map((val) => (
            <Column
              size={9}
              classes="offset-md-1 mt-5 d-flex text-left align-items-center shadow-lg border border-3 fw-bold fs-3"
            >
              <ImageWithFallback
                source={val.productImage}
                classes={"img-thumbnail"}
              />
              <div className="ms-4">
                <h4 className="mb-5">
                  ProductName :
                  <span className="text-info">{val.productName}</span>
                </h4>
                <h4 className="bd-highlight mt-2 mb-5">
                  ProductPrice :
                  <span className="text-info">{val.productPrice}</span>
                </h4>
                <h4 className="mt-2 mb-5">
                  ProductSalePrice :
                  <span className="text-info">{val.productSalePrice}</span>
                </h4>
                <h4 className="mt-2">
                  ProductStock :{" "}
                  <span className="text-info">{val.productStock}</span>
                </h4>
              </div>
            </Column>
          ))}
        </Row>
      </ErrorBoundary>
    );
  }
}
const mapStateToProps = (state: StoreType) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(ProductDetail);
