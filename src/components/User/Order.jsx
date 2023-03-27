import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { API_URL } from "../../App";
import { cartContext } from "../../App";
import TopBar from "./TopBar";
import moment from "moment";

function Orders() {
  let context = useContext(cartContext);
  const [orders, setOrders] = useState([]);
  let token = sessionStorage.getItem("token");
  let id = sessionStorage.getItem("userId");
  let navigate = useNavigate();

  let getOrders = async () => {
    if (token) {
      let res = await axios.get(`${API_URL}/ordersByUser/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(res.data.userOrders);
      if (res.data.statusCode === 200) {
        setOrders(res.data.userOrders);
      } else {
        alert("Data Fetching Error");
        navigate("/");
      }
    } else {
      alert("Session Expired");
      navigate("/login");
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <TopBar value={{ cart: context.cart }} />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Order Id</th>
              <th>Food</th>
              <th>Total Amount</th>
              <th>status</th>
              <th>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((e, i) => {
              return (
                <tr key={i} onClick={() => navigate(`/order-details/${e._id}`)}>
                  <td>{i + 1}</td>
                  <td>{e._id}</td>
                  <td>Items - {e.orderItems.length}</td>
                  <td>{e.orderAmount}</td>
                  <td>{e.status}</td>
                  <td>
                    {moment(e.orderedAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default Orders;
