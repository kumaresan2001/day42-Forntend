import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import TopBar from "./TopBar";
import { cartContext, addressContext, API_URL } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Payment() {
  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);
  const cartStore = useContext(cartContext);
  const addressStore = useContext(addressContext);
  let token = sessionStorage.getItem("token");
  let userId = sessionStorage.getItem("userId");
  let userName = sessionStorage.getItem("userName");
  let img = "https://via.placeholder.com/200";

  let navigate = useNavigate();

  //   console.log(cartStore.cart);
  //   console.log(addressStore.address);

  const initPayment = (data) => {
    // console.log(data);
    const options = {
      key: "rzp_test_2CuJ8wmq3mGbip",
      amount: data.amount,
      currency: data.currency,
      name: "Food Delivery App",
      description: "Test Transaction",
      order_id: data.id,
      handler: async (response) => {
        // console.log({ ...response });
        try {
          const res = await axios.post(`${API_URL}/payment/verify`, {
            ...response,
            orderItems: cartStore.cart,
            userName,
            userId,
            deliveryAddress: addressStore.address[0],
            orderAmount: total,
            contact: addressStore.address[1],
          });
          // console.log(res);
          if (res.data.statusCode === 200) {
            // console.log(res.data.order._id);
            cartStore.setCart([]);
            navigate(`/order/success/${res.data.order._id}`);
          }
        } catch (error) {
          alert(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
      prefill: {
        contact: addressStore.address[1],
        name: userName,
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  let handleOrder = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        setLoading(true);

        let res = await axios.post(
          `${API_URL}/order`,
          {
            orderAmount: total,
            deliveryAddress: addressStore.address[0],
            contact: addressStore.address[1],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // console.log(res);
        if (res.data.statusCode === 200) {
          initPayment(res.data.order);
        } else {
          alert(res.data.message);
        }
      } else {
        alert("Token Expired! Please Login");
        navigate("/login");
      }
    } catch (err) {
      alert(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    let sum = 0;

    for (var i in cartStore.cart) {
      let itemSum = 0;
      itemSum = cartStore.cart[i].price * cartStore.cart[i].count;
      sum += itemSum;
    }
    setTotal(sum);
  }, [cartStore.cart]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-content-center">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <TopBar value={{ cart: cartStore.cart }} />
      <h2 className="text-center">Order Confirmation</h2>
      <div className="container d-flex justify-content-around flex-wrap mt-5">
        <Card style={{ width: "18rem" }}>
          <Card.Body className="text-center">
            <Card.Title>Delivery Details</Card.Title>
            <Card.Text className="text-muted">Address</Card.Text>
            <Card.Text>{addressStore.address[0]}</Card.Text>
            <Card.Text className="text-muted">Contact</Card.Text>
            <Card.Text>{addressStore.address[1]}</Card.Text>
          </Card.Body>
        </Card>

        <div className="col-md-6">
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Food</th>
                <th>Price</th>
              </tr>
            </thead>
            {cartStore.cart.map((e, i) => {
              return (
                <tbody key={e.image}>
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      {
                        <img
                          src={e.imageUrl ? e.imageUrl : img}
                          alt=""
                          width="100px"
                          height="75px"
                        ></img>
                      }
                    </td>
                    <td>{e.name}</td>
                    <td>
                      {e.price} x {e.count}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <h3 className="text-end">Total= &#8377; {total}</h3>
        </div>
      </div>

      <div className="text-center mt-5">
        <Button variant="primary" onClick={(e) => handleOrder(e)}>
          Proceed for Payment
        </Button>
      </div>
    </>
  );
}

export default Payment;
