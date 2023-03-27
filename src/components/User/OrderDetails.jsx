import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

import { API_URL, cartContext } from "../../App";
import TopBar from "./TopBar";

function OrderDetails() {
  let context = useContext(cartContext);
  const [data, setData] = useState([]);
  let [orderAmount, setOrderAmount] = useState(0);
  let [contact, setContact] = useState("");
  let [deliveryAddress, setDeliveryAddress] = useState("");
  let [status, setStatus] = useState("");
  let [userName, setUserName] = useState("");
  let [paymentId, setPaymentId] = useState("");
  let token = sessionStorage.getItem("token");
  let navigate = useNavigate();
  const { id } = useParams();

  const loadData = async () => {
    if (token) {
      let res = await axios.get(`${API_URL}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data.order);
      if (res.data.statusCode === 200) {
        setData(res.data.order.orderItems);
        setPaymentId(res.data.order.payment[0].razorpay_payment_id);
        setOrderAmount(res.data.order.orderAmount);
        setContact(res.data.order.contact);
        setDeliveryAddress(res.data.order.deliveryAddress);
        setStatus(res.data.order.status);
        setUserName(res.data.order.userName);
      } else {
        alert(res.data.message);
        // navigate("/login");
      }
    } else {
      alert("Session Expired");
      navigate("/login");
    }
  };

  // console.log(data);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <TopBar value={{ cart: context.cart }} />
      <div>
        <div className="text-center">
          <h2>Ordered Food!</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Ordered</th>
                <th>Delivery Address</th>
                <th>Phone Number</th>
                <th>Amount Paid</th>
                <th>Payment ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{userName}</td>
                <td>{deliveryAddress}</td>
                <td>{contact}</td>
                <td>&#8377; {orderAmount}</td>
                <td>{paymentId}</td>
                <td>{status}</td>
              </tr>
            </tbody>
          </Table>
          <div className="container-fluid d-grid justify-content-center ">
            <div className="row">
              {data.map((e, i) => {
                return (
                  <div key={i} className="col shadow bg-white rounded p-3">
                    <div className="">
                      <img src={e.imageUrl} alt={e.name} height={"200px"} />
                    </div>
                    <div className="m-auto p-3 text-center">
                      <h2 className="p-1 text-capitalize">{e.name}</h2>
                      <h4 className="p-1">
                        &#8377; {e.price} x {e.count} = {e.price * e.count}
                      </h4>
                      <div className="p-1">{e.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
