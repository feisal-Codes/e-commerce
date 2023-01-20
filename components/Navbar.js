import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { Store } from "../utils/Store";
import Badge from "react-bootstrap/Badge";
import Link from "next/link";
import Cookies from "js-cookie";
import styles from "../styles/components/navbar.module.css";

function NavBar() {
  const category = Cookies.get("category")
    ? JSON.parse(Cookies.get("category"))
    : [];

  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [show, setShow] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };

  const showDropdownAccount = e => {
    setShowAccount(!showAccount);
  };
  const hideDropdownAccount = e => {
    setShowAccount(false);
  };

  return (
    
    <Navbar sticky="top" bg="white" expand="sm">
      <Link href="/" passHref>
        <Navbar.Brand>
          <div className={styles.navbar__logo}>
            <Image
              src="/logo5.png"
              width="200px"
              height="60px"
              alt="site logo"
              layout="responsive"
            />
          </div>
        </Navbar.Brand>
      </Link>

      <Navbar.Collapse id="navbarScroll" className={styles.navbar__collapse}>
        {/* <div style={{display:"flex", justifyContent:"space-around", width:"100%"}} className={styles.navbar__collapse}> */}
        <Form className={styles.navbar__form}>
          <FormControl
            type="search"
            placeholder="Search For Products "
            className="mr-2"
            aria-label="Search"
            style={{ width: "100%" }}
          />

          <Button style={{ backgroundColor: "white", borderColor: "#ced4da" }}>
            {" "}
            <FaSearch color="black" />
          </Button>
        </Form>

        <Nav className={styles.navbar__nav}>
          <Link href="/" passHref>
            <Nav.Link>Home</Nav.Link>
          </Link>
          <NavDropdown
            title="Browse"
            id="navbarScrollingDropdown"
            show={show}
            // onMouseEnter={showDropdown}
            // onMouseLeave={hideDropdown}
            onClick={showDropdown}
          >
            {category.map(item => {
              return (
                <Link key={item.id} href={`../../category/${item.id}`} passHref>
                  <Nav.Link className={styles.navbar__dropdown}>
                    {item.title}
                  </Nav.Link>
                </Link>
              );
            })}
          </NavDropdown>

          {userInfo ? (
            <NavDropdown
              title="My Account"
              id="navbarScrollingDropdown"
              show={showAccount}
              // onMouseEnter={showDropdownAccount}
              // onMouseLeave={hideDropdownAccount}
              onClick={showDropdownAccount}
            >
              <Link href="../../dashboard" passHref>
                <Nav.Link className={styles.navbar__dropdown}>
                  Dashboard
                </Nav.Link>
              </Link>
              <Link href="/" passHref>
                <Nav.Link className={styles.navbar__dropdown}>Logout</Nav.Link>
              </Link>
            </NavDropdown>
          ) : (
            <>
              <Link href="../../login" passHref>
                <Nav.Link>Login</Nav.Link>
              </Link>

              <Link href="../../register" passHref>
                <Nav.Link>Register</Nav.Link>
              </Link>
            </>
          )}
        </Nav>
        {/* </div> */}
      </Navbar.Collapse>
      <Link href="../../cart" passHref>
        <Nav.Link>
          <FaShoppingCart size={25} className={styles.navbar__cart} />
          {cart.cartItems.length > 0 && (
            <Badge bg="dark">{cart.cartItems.length}</Badge>
          )}
        </Nav.Link>
      </Link>
      <Navbar.Toggle aria-controls="navbarScroll" />
    </Navbar>
  );
}

export default NavBar;
