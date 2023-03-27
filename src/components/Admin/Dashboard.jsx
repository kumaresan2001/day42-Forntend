import axios from "axios";
import AdminNav from "./AdminNav";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../App";
import { CircularProgress } from "@mui/material";

function Dashboard() {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  let loadData = async () => {
    try {
      if (token) {
        setLoading(true);
        let res = await axios.get(`${API_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.statusCode === 200) {
          setData(res.data.orders);
        } else {
          alert(res.data.message);
          navigate("/login");
        }
      } else {
        alert("Session Expired");
        navigate("/login");
      }
    } catch (error) {
      alert(error);
      // console.log(error);
    }
    setLoading(false);
  };

  // console.log(data);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <AdminNav />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Order Id</th>
              <th>Payment Id</th>
              <th>Order Amount</th>
              <th>Status</th>
              <th>Ordered At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e, i) => {
              return (
                <tr key={i} onClick={() => navigate(`/dashboard/${e._id}`)}>
                  <td>{i + 1}</td>
                  <td>{e._id}</td>
                  <td>{e.payment[0].razorpay_payment_id}</td>
                  <td>&#8377; {e.orderAmount}</td>
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

export default Dashboard;
