import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { Store } from "../utils/Store";
import config from "../utils/config";
import fetcher from "../utils/fetcher";
import styles from "../styles/pages/login.module.css";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  console.log("...................Access token....................");
  userInfo ? console.log(userInfo.accessToken) : console.log("Doesnt exist");

  if (userInfo) {
    router.push(redirect || "/");
  }

  const usernameRef = useRef();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login } = config;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: username,
      password: password,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    console.log("this is the body");
    console.log(raw);

    const result = await fetcher(login, requestOptions);
    if (result.responseCode !== "00") {
      console.log("Error");
      return;
    }
    dispatch({ type: "userLogin", payload: result.data });
    let loginInfo = JSON.stringify(result.data);
    Cookies.set("userInfo", loginInfo);
    router.push(redirect || "/");
  };

  return (
    <div
      className= {styles.login__container}
    >
      <div
      className ={styles.login__form}
      >
        <Form className="w-100">
          <Form.Group className="mb-3 " controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={usernameRef}
              type="email"
              placeholder="Enter email"
              onChange={event => {
                setUsername(event.target.value);
              }}
              value={username}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={event => {
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
            Login
          </Button>
          <Form.Text className="text-muted">
            Dont have an account?
            <Link href="./register">Register</Link>
          </Form.Text>
        </Form>
      </div>
    </div>
  );
}

// fetch(login, requestOptions)
//   .then((response) => response.json())
//   .then((result) => {
//     console.log(result);
//     if (result.responseCode === "00") {
//       dispatch({ type: "userLogin", payload: result.data });
//       let loginInfo= JSON.stringify(result.data)
//       Cookies.set("userInfo", loginInfo);
//       router.push(redirect || "/");
//     }

//     console.log("..................................");
//   })
//   .catch((error) => console.log("error", error));
