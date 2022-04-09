import React from "react";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { placeOrder } from "../actions/orderActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";
require('dotenv').config()
export default function Checkout({ subtotal }) {
  console.log("on checkout screen");
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const { loading, error, success } = orderstate;
  const dispatch = useDispatch();
  function tokenHander(token) {
    console.log(token);
    dispatch(placeOrder(token, subtotal));
  }
  const publish_key="pk_test_51Kme69SA3r96H0FngriQzr12ISr9Ej5UUSPbRt0kT4bghoYxIxsOBEORPSfkFN03TMqXM5kSGwy3UMp3i9UCnVQV00yHE1dm4g";
  console.log(publish_key);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {success && <Success success="Your Order Placed Successfully" />}

      {currentUser ? (

        <StripeCheckout
          amount={subtotal * 100}
          shippingAddress
          token={tokenHander}
          stripeKey={publish_key}
          currency="INR"
        >
          <button className="btn">Pay Now</button>
        </StripeCheckout>
      ) : (
        <button className="btn">Login to Pay</button>
      )}
    </div>
  );
}
