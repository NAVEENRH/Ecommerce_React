import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "./components/Container";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
import Cart from "./containers/Cart";
import Login from "./containers/Login";
import ProductDetail from "./containers/ProductDetail";
import Register from "./containers/Register";
import ProductList from "./containers/ProductList";
// import Profile from "./containers/Profile";
import Demo from "./Demo";
import Checkout from "./containers/Checkout";
import address from "./containers/address";
import myorders from "./containers/myorders";
import Payment from "./containers/Payment";
import Home from "./containers/Home";

const LazyProfile = React.lazy(() => import("./containers/Profile"));

const AppRouter: React.FC = (props) => {
  return (
    <main>
      <Container fluid>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* <Route path={"/"} component={Demo} exact /> */}
            <Route path={"/"} component={Home} exact />
            <Route path={"/products"} component={ProductList} />
            <Route path={"/login"} component={Login} />
            <Route path={"/cart"} component={Cart} />
            <Route path={"/register"} component={Register} />
            <Route path={"/payment"} component={Payment} />
            <Route path={"/productdetail/:id"} component={ProductDetail} />
            <PrivateRoute path={"/profile"} component={LazyProfile} />
            <PrivateRoute path={"/checkout"} component={Checkout} />
            <PrivateRoute path={"/address"} component={address} />
            <PrivateRoute path={"/myorders"} component={myorders} />
            <PrivateRoute path={"/myorders"} component={myorders} />


            {/* 404 Route */}
            <Route component={ErrorPage} />
          </Switch>
        </React.Suspense>
      </Container>
    </main>
  );
};
export default AppRouter;
