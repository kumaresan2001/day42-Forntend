import React, { useEffect, useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../App";
import { addressContext } from "../../App";
import TopBar from "./TopBar";

function Cart() {
  let context = useContext(cartContext);
  let addressStore = useContext(addressContext);
  let img = "https://via.placeholder.com/200";
  let [total, setTotal] = useState(0);
  let [deliveryAddress, setDeliveryAddress] = useState("");
  let [contact, setContact] = useState("");

  let navigate = useNavigate();

  let addQuantity = async (e) => {
    let newArray = [...context.cart];
    let itemIndex = newArray.findIndex((item) => item._id === e._id);

    if (itemIndex !== -1) {
      newArray[itemIndex].count += 1;
    }
    context.setCart(newArray);
  };

  let removeFromCart = async (e) => {
    let newArray = [...context.cart];
    let itemIndex = newArray.findIndex((item) => item._id === e._id);
    if (itemIndex !== -1) {
      newArray[itemIndex].count -= 1;
    }

    if (newArray[itemIndex].count === 0) {
      newArray.splice(itemIndex, 1);
    }
    context.setCart(newArray);
  };

  let handleAddress = async (e) => {
    e.preventDefault();
    if (context.cart.length > 0 && deliveryAddress !== "" && contact !== "") {
      addressStore.setAddress([deliveryAddress, contact]);
      navigate("/payment");
    } else {
      alert("Kindly check for empty slots!");
    }
  };

  useEffect(() => {
    let sum = 0;

    for (var i in context.cart) {
      let itemSum = 0;
      itemSum = context.cart[i].price * context.cart[i].count;
      sum += itemSum;
    }
    setTotal(sum);

    if (addressStore.address?.length > 0) {
      setDeliveryAddress(addressStore.address[0]);
      setContact(addressStore.address[1]);
    }
  }, [context.cart, addressStore.address]);

  return (
    <>
      <TopBar value={{ cart: context.cart }} />

      <div className="container my-5 text-center col-md-4">
        <h2 className="m-4"> Enter Address to place order.</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              as="textarea"
              value={deliveryAddress}
              placeholder="Enter your complete address"
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" onClick={(e) => handleAddress(e)}>
            Confirm Order
          </Button>
        </Form>
      </div>

      <div className="mt-5">
        <Table
          striped
          hover
          bordered
          className="text-center container table align-middle"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {context.cart.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>
                    {
                      <img
                        src={e.imageUrl ? e.imageUrl : img}
                        alt=""
                        width={"120px"}
                        height={"80px"}
                      ></img>
                    }
                  </td>
                  <td>{e.name}</td>
                  <td>{e.description}</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="55"
                      height="35"
                      fill="currentColor"
                      className="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                      onClick={() => addQuantity(e)}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    <span>{e.count}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="55"
                      height="35"
                      fill="currentColor"
                      className="bi bi-dash-circle"
                      viewBox="0 0 16 16"
                      onClick={() => removeFromCart(e)}
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                    </svg>
                  </td>
                  <td>
                    &#8377; {e.price} &#9747; {e.count}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <h2 className="text-end mx-5 px-5 text-nowrap">
          Total = &#8377; {total}
        </h2>
      </div>

      <div>.</div>
    </>
  );
}

export default Cart;
