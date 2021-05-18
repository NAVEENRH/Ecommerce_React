import { ProductType } from "../../types";
const ActionTypes = {
  ADD_TO_PRODUCTDETAIL: "[PRODUCTDETAIL] add productdetail",
};
const addToProductDetail = (product: ProductType) => {
  return {
    type: ActionTypes.ADD_TO_PRODUCTDETAIL,
    product,
  };
};

const ProductActions = {
  ActionTypes,
  addToProductDetail,
};
export default ProductActions;