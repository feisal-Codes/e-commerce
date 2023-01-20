import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import CheckoutProgress from "../components/CheckoutProgress";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import dynamic from "next/dynamic";
import Link from "next/link";

import router from "next/router";
import config from "../utils/config";
import styles from "../styles/pages/login.module.css";






const { placeOrder } = config;
function Placeorder() {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { shippingAddress, paymentMethod, cartItems },
    userInfo,
  } = state;
 
  useEffect(() => {
    if (!paymentMethod ) {
      router.push("/payment");
    }
  }, []);

  if(!userInfo || cartItems.length < 1 || Object.keys(shippingAddress).length === 0 ){

    return (
      <div style={{textAlign:"center", marginTop:"20%"}}>
        <h3>
          Something Went Wrong
   
        </h3>
        <h4>
          <Link href="/">
            Go back to the Homepage
          </Link>
        </h4>
      </div>
    )
   
   }
   





  const handleOrder = () => {
    console.log(cartItems);
    console.log("**********************************************");
    console.log(userInfo.accessToken);
    const createOrder = {
      fullName: userInfo.customer.firstName + "" + userInfo.customer.lastName,
      phoneNumber: "257788999",
      email: userInfo.customer.email,
      price: "7530",
      shipping: "30",
      paymentMode: paymentMethod.toUpperCase(),
      location: "outside",
      billingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.county,
        country: "Kenya",
        zipCode: "4245242",
        type: "shipping",
      },
      products: cartItems.map(product => {
        return {
          productId: product.id,
          productName: product.title,
          productPrice: product.price,
        };
      }),
    };

    console.log("**********************************************");
    console.log(createOrder.products);
    console.log("**********************************************");
    console.log(createOrder);
    console.log("**********************************************");
    console.log("**********************************************");

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer" + userInfo.accessToken ) ;
    // myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(createOrder);

    let requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      body: raw,
    };

    fetch(placeOrder, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log("error", error));
  };



  return (
    <div
      style={{
        paddingTop: "3em",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <CheckoutProgress activeStep={3} />
      <div>
        <Row>
          <Col sm={1}></Col>

          <Col className={styles.placeorder__shipping_address} xs={12} sm={7}>
            <p>
              <b>Shipping Address</b>
            </p>
            <p>
              Full Names: {shippingAddress.firstname} {shippingAddress.lastname}
            </p>
            <p> County: {shippingAddress.county}</p>
            <p> Address: {shippingAddress.address}</p>
          </Col>
          <Col
            xs={12}
            sm={3}
            className={styles.placeorder__place_order_hide_on_mobile}
          >
            <Container
              fluid
              style={{
                padding: "1em",
                paddingBottom: "0",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Row>
                <Col>
                  Subtotal (
                  {state.cart.cartItems.reduce(
                    (a, c) => a + Number(c.quantity),
                    0
                  )}{" "}
                  items)
                </Col>
                <Col>
                  Ksh:
                  {state.cart.cartItems.reduce(
                    (a, c) => a + Number(c.quantity) * Number(c.price),
                    0
                  )}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <h4>Total</h4>
                </Col>
                <Col>
                  <h4>
                    Ksh:
                    {state.cart.cartItems.reduce(
                      (a, c) => a + Number(c.quantity) * Number(c.price),
                      0
                    )}
                  </h4>
                </Col>
              </Row>
              <Row>
                <Button
                  style={{
                    marginTop: "1em",
                    border: "none",
                    backgroundColor: "orange",
                    color: "black",
                    padding: "5px",
                  }}
                  onClick={handleOrder}
                >
                  Place Order
                </Button>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>
          <Col sm={1}></Col>

          <Col className={styles.placeorder__shipping_address} xs={12} sm={7}>
            <p>
              <b>Payment Method</b>
            </p>
            <p>
              {paymentMethod === "cash" ? "Cash on Delivery" : paymentMethod}
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={1}></Col>

          <Col className={styles.placeorder__shipping_address} xs={12} sm={7}>
            <p>
              <b>Items</b>
            </p>

            {state.cart.cartItems.map(item => {
              return (
                <div key={item.id}>
                  <hr />

                  <Row>
                    <Col xs={6} sm={8}>
                      {item.title}
                    </Col>
                    <Col xs={3} sm={2}>
                      {item.quantity}
                    </Col>
                    <Col xs={2} sm={2} style={{ textAlign: "end" }}>
                      {item.price}
                    </Col>
                  </Row>
                  <hr />
                </div>
              );
            })}
          </Col>
          <Col
            xs={12}
            sm={3}
            className={styles.placeorder__place_order_hide_on_pc}
          >
            <div className={styles.placeorder__place_order__container}>
              <Row>
                <Col>
                  Subtotal (
                  {state.cart.cartItems.reduce(
                    (a, c) => a + Number(c.quantity),
                    0
                  )}{" "}
                  items)
                </Col>
                <Col>
                  Ksh:
                  {state.cart.cartItems.reduce(
                    (a, c) => a + Number(c.quantity) * Number(c.price),
                    0
                  )}
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <h4>Total</h4>
                </Col>
                <Col>
                  <h4>
                    Ksh:
                    {state.cart.cartItems.reduce(
                      (a, c) => a + Number(c.quantity) * Number(c.price),
                      0
                    )}
                  </h4>
                </Col>
              </Row>
              <Row>
                <Button
                  style={{
                    marginTop: "1em",
                    border: "none",
                    backgroundColor: "orange",
                    color: "black",
                    padding: "5px",
                  }}
                  onClick={handleOrder}
                >
                  Place Order
                </Button>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(Placeorder), { ssr: false });
