import React from "react";
import { RouteComponentProps } from "react-router";
import Column from "../components/Column";
import ErrorBoundary from "../components/ErrorBoundary";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { ProductType } from "../types";
import "../index"

type ProductProps = {
  pdata: ProductType;
  wishlist?: boolean;
  currencyCode: string;
  btnClick: () => void;
};
type State = {
  productList: any,
}

class ProductDetail extends React.Component<RouteComponentProps> {
  state: State = { productList: [] };

  async componentDidMount() {
    try {
      const params: any = this.props.match.params;
      const { data } = await ProductService.getProductById(params.id);
      console.log("success", data);
      this.setState({
        productList: data
      })
    } catch (e) {
      console.log("error", e);
    }
  }


  render() {
    return (
      <ErrorBoundary>
        <Row>
          <Column size={6}
            classes="offset-md-3">
            <div className="card-title shadow-lg p-2 rounded-pill">
              <h1 className="text-primary text-center">Product Detail</h1>
            </div>
          </Column>

          <Column size={8}
            classes="offset-md-2 mt-4">
            <div>
              <img src={this.state.productList.productImage} className="img-thumbnail float-start product-image" />

              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h3 className="text-info">Name :</h3>
                <h4>{this.state.productList.productName}</h4>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h3 className="text-info">Price :</h3>
                <h4>{this.state.productList.productPrice}</h4>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h3 className="text-info">SalePrice :</h3>
                <h4>{this.state.productList.productS}</h4>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h3 className="text-info">Stock :</h3>
                <h4>{this.state.productList.productStock}</h4>
              </li>

            </div>
          </Column>

        </Row>
      </ErrorBoundary>
    );
  }
}

export default ProductDetail;
