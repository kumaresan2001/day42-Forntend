import AdminNav from "./AdminNav";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

import { API_URL } from "../../App";

function FoodManagement() {
  let [data, setData] = useState([]);
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescription] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  let img = "https://via.placeholder.com/200";
  let navigate = useNavigate();
  let token = sessionStorage.getItem("token");

  let handleDelete = async (id) => {
    let res = await axios.delete(`${API_URL}/delete-food/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.statusCode === 200) {
      loadData();
    }
  };

  let loadData = async () => {
    if (token) {
      let token = sessionStorage.getItem("token");
      let res = await axios.get(`${API_URL}/all-food`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.statusCode === 200) {
        setData(res.data.food);
      }
    } else {
      alert("Session Expired");
      navigate("/login");
    }
  };

  let handleSubmit = async () => {
    if (name && price && description !== "") {
      let res = await axios.post(
        `${API_URL}/add-food`,
        {
          name,
          price: +price,
          description,
          imageUrl,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.statusCode === 200) {
        setName("");
        setPrice("");
        setDescription("");
        setImageUrl("");
        loadData();
        alert("Food Added Successfully!");
      } else if (res.data.statusCode === 401) {
        alert(res.data.message);
      }
    } else {
      alert("please fill all fields");
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <AdminNav />
      <div>
        <div className="add-food-wrapper container col-md-4 mt-4 text-center">
          <h3>Add your Food here!</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={name}
                placeholder="Food Name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={price}
                placeholder="Price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={description}
                placeholder="Description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                value={imageUrl}
                placeholder="Image Url"
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" onClick={() => handleSubmit()}>
              Submit
            </Button>
          </Form>
        </div>
        <div className="m-5 p-3">
          <Table
            striped
            bordered
            hover
            responsive="sm"
            className=" text-center container align-middle "
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      <img
                        src={e.imageUrl ? e.imageUrl : img}
                        alt=""
                        width={"100px"}
                        height={"80px"}
                      ></img>
                    </td>
                    <td>{e.name}</td>
                    <td>{e.price}</td>
                    <td>{e.description}</td>
                    <td>
                      <Button
                        onClick={() => handleDelete(e._id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default FoodManagement;
