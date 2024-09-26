import React, { useEffect } from "react";
import Success from "../../components/customer/Success/Success";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/silce/customer/cartSlice";

export default function OrderSuccess() {
  const location = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const stripeSessionId = queryParams.get("session_id");

  useEffect(() => {
    if (stripeSessionId) {
      dispatch(clearCart());
    }
  }, []);
  return <Success />;
}
