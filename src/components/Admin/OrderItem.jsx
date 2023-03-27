import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { API_URL } from "../../App";

function OrderItem() {
  let [data, setData] = useState([]);
  let [orderAmount, setOrderAmount] = useState(0);
  let [contact, setContact] = useState("");
  let [deliveryAddress, setDeliveryAddress] = useState("");
  let [status, setStatus] = useState("");
  let [userName, setUserName] = useState("");
  let navigate = useNavigate();
  let { id } = useParams();
  let img = "https://via.placeholder.com/200";
  let loadData = async () => {
    let token = sessionStorage.getItem("token");
    if (token) {
      let res = await axios.get(`${API_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.statusCode === 200) {
        setData(res.data.order.orderItems);
        setOrderAmount(res.data.order.orderAmount);
        setContact(res.data.order.contact);
        setDeliveryAddress(res.data.order.deliveryAddress);
        setStatus(res.data.order.status);
        setUserName(res.data.order.userName);
      } else {
        alert(res.data.message);
      }
    } else {
      alert("Session Expired");
      navigate("/login");
    }
  };

  let changeStatus = async () => {
    let token = sessionStorage.getItem("token");
    let res = await axios.put(
      `${API_URL}/order-status/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.data.statusCode === 200) loadData();
  };

  useEffect(() => {
    if (id) {
      loadData();
    } else {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AdminNav />
      <div>
        <div>
          <div className="text-center">
            <h2>Ordered Food!</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Ordered</th>
                  <th>Delivery Address</th>
                  <th>Phone Number</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{userName}</td>
                  <td>{deliveryAddress}</td>
                  <td>{contact}</td>
                  <td>&#8377; {orderAmount}</td>
                  <td>{status}</td>
                  <td>
                    <div>
                      {status === "Ordered" ? (
                        <Button onClick={() => changeStatus()} variant="danger">
                          Accept{" "}
                        </Button>
                      ) : status === "Placed" ? (
                        <Button
                          onClick={() => changeStatus()}
                          variant="warning"
                        >
                          Ship Order{" "}
                        </Button>
                      ) : status === "In-Transit" ? (
                        <Button
                          onClick={() => changeStatus()}
                          variant="success"
                        >
                          Delivered{" "}
                        </Button>
                      ) : (
                        <></>
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="container-fluid d-grid justify-content-center ">
              <div className="row">
                {data.map((e, i) => {
                  return (
                    <div key={i} className="col shadow bg-white rounded p-3">
                      <div className="">
                        <img
                          src={e.imageUrl ? e.imageUrl : img}
                          alt="e.name"
                          height={"200px"}
                        />
                      </div>
                      <div className="m-auto p-3 text-center">
                        <h2 className="p-1">{e.name}</h2>
                        <h4 className="p-1">&#8377; {e.price}</h4>
                        <div className="p-1">{e.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
