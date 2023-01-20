import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import dynamic from "next/dynamic";

import { useEffect, useRef, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import CheckoutProgress from "../components/CheckoutProgress";
import styles from "../styles/pages/login.module.css";



export default function Shipping() {

  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  
  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
  }, []);

  console.log(shippingAddress);

  const [firstname, setFirstname] = useState(
    shippingAddress ? shippingAddress.firstname : ""
  );
  const [lastname, setLastname] = useState(
    shippingAddress ? shippingAddress.lastname : ""
  );
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.county : ""
  );
  const [city, setCity] = useState(
    shippingAddress ? shippingAddress.city : ""
  );
  console.log(shippingAddress.firstname);
  const shippingData = {
    firstname: firstname,
    lastname: lastname,
    address: address,
    country: country,
    city:city
  };

  console.log(".......................");
  console.log(shippingData);

  const router = useRouter();


  // const fetcher = (requestOptions) => {
  //   try {
  //     fetch("http://172.104.141.50:8096/customer/register", requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => console.log(result))
  //       .catch((error) => console.log("error", error));
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const handleSubmit = () => {
    dispatch({ type: "saveShippingAddress", payload: shippingData });
    console.log("dispatch is running");
    console.log(shippingData);
    let shippingDatta = JSON.stringify(shippingData);
    console.log("............new......................");
    console.log(shippingDatta);
    Cookies.set("shippingAddress", shippingDatta);
    console.log("dispatch is finished");
    console.log("this is shipping address");
    console.log(shippingAddress);
    router.push("/payment")
  };

  
  return (
    <div
      style={{
        paddingTop: "3em",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <CheckoutProgress activeStep={1}/>
    

      <div
            className ={styles.shipping__shipping__form}

      >
        <h2>Shipping Address</h2>
          <Form className="w-100">
            <Form.Group className="mb-3 ">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Firstname"
                onChange={(event) => {
                  setFirstname(event.target.value);
                }}
                value={firstname}
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter lastname"
                onChange={(event) => {
                  setLastname(event.target.value);
                }}
                value={lastname}
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                onChange={(event) => {
                  setCountry(event.target.value);
                }}
                value={country}
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                value={city}
              />
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location in which you live "
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                value={address}
              />
            </Form.Group>

            <Button
            style={{
              width: "100%",
              backgroundColor: "purple",
              textAlign: "start",
              border: "none",
              margin: "6px 0",
            }}
            onClick={handleSubmit}
            
          >
            Continue
          </Button>
          </Form>
          
        
       
      </div>
    </div>
  );
}


// export default dynamic(() => Promise.resolve(Shipping), { ssr: false });


