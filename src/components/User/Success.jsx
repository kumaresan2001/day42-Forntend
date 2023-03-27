import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../App";
import TopBar from "./TopBar";

function Success() {
  const { id } = useParams();
  const navigate = useNavigate();
  let context = useContext(cartContext);

  return (
    <>
      <TopBar value={{ cart: context.cart }} />
      <div className="container text-center my-5 py-5 gap-5">
        <div className="">
          <div className="my-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="85"
              height="70"
              fill="green"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <h3>Your Order Placed Successfully.</h3>
          <div>Order Id- {id}</div>
          <div>
            <span
              className="text-primary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/order-details/${id}`)}
            >
              Click Here
            </span>{" "}
            to track your order
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
