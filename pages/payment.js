import React, {useEffect, useState, useContext} from 'react'
import Cookies from "js-cookie"
import  { useRouter} from 'next/router'
import { Store } from '../utils/Store';
import CheckoutProgress from "../components/CheckoutProgress";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import dynamic from "next/dynamic";
import styles from "../styles/pages/login.module.css";




 function Payment() {
    const router  = useRouter();
    const { state, dispatch } = useContext(Store);
    const [paymentMethod, setPaymentMethod]= useState('')
    const {
      
      cart: { shippingAddress },
    } = state;
  useEffect(() => {
    if(!shippingAddress.address){
        router.push("/shipping");

    }
    
    
  }, [])

  const handleSubmit=(e)=>{
      e.preventDefault();
    //   if(!paymentMethod){
    //       e.target.disabled=true;
    //   }


          dispatch({type:"savePaymentMethod", payload:paymentMethod});
          Cookies.set("paymentMethod", paymentMethod);
           router.push("/placeorder")
          // console.log("payment.......................................");
          // const paym= Cookies.get("paymentMethod");

          // console.log(paym)
          // console.log(paymentMethod)

      
  }


    return (
        <div
        style={{
          paddingTop: "3em",
          backgroundColor: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <CheckoutProgress activeStep={2}/>
        <div
       className={styles.paymentmethod__payment_method}
>
      {/* <h3> Payment method</h3> */}
      <Form  
      
      className={styles.paymentmethod__payment_form}
      >

      <Form.Check 
        type= "radio"
        id="card"
        label="Card Payment"
        name="payment"
        value="card"
        onChange={(e) => {setPaymentMethod(e.target.value) ;
        console.log(e.target.value)
        
        }}
      />
      <Form.Check 
        type= "radio"
        id="mpesa"
        label="Mpesa Payment"
        name="payment"
        style={{marginTop:"2em"}}
        value="mpesa"
        onChange={(e) => setPaymentMethod(e.target.value)}


      />
       <Form.Check 
        type= "radio"
        id="cash"
        label="Cash On Delivery"
        name="payment"
        style={{marginTop:"2em"}}
        value="cash"
        onChange={(e) => setPaymentMethod(e.target.value)}


      />
 <Button
            style={{
              width: "100%",
              backgroundColor: "purple",
              textAlign: "start",
              border: "none",
              margin: "5em 0",
            }}
            onClick={handleSubmit}
            
          >
            Continue
          </Button>
     
</Form>
</div>

        



      </div>
    )
}


export default dynamic(() => Promise.resolve(Payment), { ssr: false });
