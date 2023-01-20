import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Store } from "../utils/Store";
import { AiOutlineDelete, AiOutlinePlusSquare } from "react-icons/ai";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "../styles/pages/cart.module.css";

import Form from "react-bootstrap/Form";
import router from "next/router";
import Layout from "../components/Layout";

function Cart() {
  const { state, dispatch } = useContext(Store);

  console.log(state.cart.cartItems);
  const updateCartHandler = (item, quantity) => {
    dispatch({ type: "addToCart", payload: { ...item, quantity } });
  };
  const removeItemHandler = item => {
    dispatch({ type: "removeFromCart", payload: item });
    console.log(item.id);
  };
  const checkoutHandler = () => {
    router.push("/shipping");
  };
  return (
    <Layout>
      {state.cart.cartItems.length > 0 ? (
        <Container fluid className={styles.cart_main_container}>

          <Col xs={12} sm={7}>
            {state.cart.cartItems.map(item => {
              return (
                <div key={item.id}>
                  <hr />

                  <Row>
                    <Col xs={7} sm={8}>
                      <AiOutlineDelete
                        onClick={() => removeItemHandler(item)}
                        size={25}
                        style={{
                          marginRight: "5px",
                          cursor: "pointer",
                          color: "red",
                          marginLeft:"5px"
                        }}
                      />{" "}
                      {item.title}
                    </Col>
                    <Col xs={3} sm={2}>
                     
                      <Form.Select
                        onChange={e => updateCartHandler(item, e.target.value)}
                        value={item.quantity}
                      >
                        {[...Array(20).keys()].map(x => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Select>
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
          <Col xs={12} sm={3}>
            <Container
              fluid
             
              className={styles.cart_price_container}

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
                    backgroundColor: "#9a4c9a",
                    color: "#ffffff",
                    padding: "5px",
                  }}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </Row>
            </Container>
          </Col>
        </Container>
      ) : (
        <Container fluid className={styles.cart_main_container}>
            <div
             className={styles.empty_cart}
            >
              {" "}
              <h3>Cart is empty</h3>
              <h4>
                <Link href="/">Start Shopping</Link>
              </h4>
            </div>
        </Container>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
