import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import styles from "../styles/components/card.module.css";


import Button from "react-bootstrap/Button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useContext } from "react";
import { Store } from "../utils/Store";
const ProductCard = ({
  productImage = "/shoes.jpg",
  productname,
  price,
  productid,
  product,
  
}) => {
  const { state, dispatch } = useContext(Store);

  const [show, setShow] = useState(false);
  //  const handleAddToCart=()=>{
  //    setShow(true)
  //   //  dispatch({type:"addToCart", payload:{...product, quantity:1}})
  //  }

  const handleAddToCart = product => {
    const itemExists = state.cart.cartItems.find(
      item => item.id === product.id
    );
    const quantity = itemExists ? itemExists.quantity + 1 : 1;
    dispatch({ type: "addToCart", payload: { ...product, quantity } });
    setShow(true);
  };

  return (
    <>
      <Card
      className={styles.card   }
      >
        <Card.Body
         
          className={styles.card__body}
        >
          <Link href={`../../products/${productid}`} passHref>
            <div>
              <div className={styles.card__image}>
                <Image
                  src={productImage}
                  alt={productname}
                  width="140px"
                  height="75px"
                  layout="intrinsic"
                />
              </div>
              <div className={styles.card__content}> 
                <Card.Text className={styles.card__text} >{productname}</Card.Text>
                <Card.Title>{`Ksh:${price}`}</Card.Title>
              </div>
            </div>
          </Link>
         
        </Card.Body>

        <AiOutlineHeart className={styles.card__button}
          size={25}
        />
      </Card>
    </>
  );
};

export default ProductCard;
