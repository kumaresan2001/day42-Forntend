import axios from "axios";
import Button from "react-bootstrap/Button";
import React, { useContext, useEffect, useState } from "react";
import TopBar from "./TopBar";
import { API_URL } from "../../App";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../App";
import { CircularProgress } from "@mui/material";

function Food() {
  const [data, setData] = useState([]);
  let [loading, setLoading] = useState(false);
  let context = useContext(cartContext);
  let navigate = useNavigate();
  let img = "https://via.placeholder.com/300";
  let token = sessionStorage.getItem("token");

  let loadData = async () => {
    try {
      if (token) {
        setLoading(true);
        let res = await axios.get(`${API_URL}/all-food`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(res.data);
        if (res.data.statusCode === 200) {
          setData(res.data.food);
        } else {
          navigate("/login");
        }
      } else {
        alert("Session Expired");
        navigate("/login");
      }
    } catch (err) {
      alert(err.message);
      // console.log(err);
    }
    setLoading(false);
  };

  let handleAdd = async (e) => {
    let temp = { ...e, count: 1 };
    // console.log(temp);
    let newArray = [...context.cart];
    newArray.push(temp);
    context.setCart(newArray);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  let dup = context.cart.map((e) => {
    return e._id;
  });

  // console.log(dup);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-content-center">
        <CircularProgress />
      </div>
    );

  return (
    <>
      <TopBar value={{ cart: context.cart }} />
      <div className="container-fluid">
        <div className="d-flex flex-wrap flex-row justify-content-evenly my-5 gap-5">
          {data.map((e, i) => {
            return (
              <div key={i} className="food-wrapper shadow bg-white rounded">
                <div className="">
                  <img
                    className="shadow bg-white rounded food-image"
                    src={e.imageUrl ? e.imageUrl : img}
                    alt="e.name"
                  />
                </div>
                <div className="p-2 text-center">
                  <h2 className="p-2">{e.name}</h2>
                  <h4 className="p-1">&#8377; {e.price}</h4>
                  <div className="p-1">{e.description}</div>
                  <div className="p-1 mb-2">
                    {dup.includes(e._id) ? (
                      <Button
                        variant="warning"
                        onClick={() => navigate("/user-cart")}
                      >
                        Go to cart
                      </Button>
                    ) : (
                      <Button onClick={() => handleAdd(e)} variant="primary">
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Food;
