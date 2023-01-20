import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import config from "../utils/config"
import styles from "../styles/pages/login.module.css";

import fetcher from "../utils/fetcher"


export default function Register() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber]= useState("");
  const {registerUser}= config

  // const fetcher = (requestOptions) => {
  //   try{
  //     fetch({registerUser}, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: password,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    
    const registerResult = await fetcher(requestOptions);

    //handle errors and redirect user here 
    
   
  };

  return (
    <div
    className= {styles.login__container}

    >
      <div
             className= {styles.login__form}

      >
        <Form className="w-100">
          <Form.Group className="mb-3 " controlId="formGroupFirstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              onChange={(event) => {
                setFirstname(event.target.value);
              }}
              value={firstname}
            />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="formGroupLastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              onChange={(event) => {
                setLastname(event.target.value);
              }}
              value={lastname}
            />
          </Form.Group>
          <Form.Group className="mb-3 " controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
              value={phone}
              type="Phone"
              placeholder="Phone"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            style={{
              width: "100%",
              backgroundColor: "purple",
              textAlign: "start",
              border: "none",
              margin: "10px 0",
            }}
            onClick={handleSubmit}
          >
            Register
          </Button>

          <Form.Text className="text-muted">
            have an account?
            <Link href="./login">Login</Link>
          </Form.Text>
        </Form>
      </div>
    </div>
  );
}
