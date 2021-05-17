import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import Column from "../components/Column";
import ErrorBoundary from "../components/ErrorBoundary";
import Row from "../components/Row";
import ProductService from "../services/ProductService";
import { ProductType } from "../types";

type ProductProps = {
  pdata: ProductType;
  wishlist?: boolean;
  currencyCode: string;
  btnClick: () => void;
};
type State = {
  productList:any,
}

class ProductDetail extends React.Component<RouteComponentProps> {
  state: State = { productList: [] };

  async componentDidMount() {
    try {
      const params: any = this.props.match.params;
      const { data } = await ProductService.getProductById(params.id);
      console.log("success", data);
      this.setState({
        productList:data
      })
    } catch (e) {
      console.log("error", e);
    }
  }

  
  render() {
    return (
      <ErrorBoundary>
        <Row>
          <Column size={12}>
            <h1 className="text-primary">Product Detail</h1>
            <img src={this.state.productList.productImage} alt="" />
            <h1>Name :- <h2>{this.state.productList.productName}</h2></h1>
            <h1>Price :- <h2>{this.state.productList.productPrice}</h2></h1>
            <h1>Stock :- <h2>{this.state.productList.productStock}</h2></h1>
          </Column>
        </Row>
      </ErrorBoundary>
    );
  }
}

export default ProductDetail;
