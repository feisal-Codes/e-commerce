import Nav from "react-bootstrap/Nav";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from 'js-cookie';
import styles from "../styles/components/customnav.module.css";



const CustomNav = () => {
  const category=Cookies.get('category') ? JSON.parse(Cookies.get('category')): []

  return (
    <Nav   className={styles.nav__container}  >
          {category.map(item=>{
              return(
                <Nav.Item  key={item.id} >
                <Link href={`../../category/${item.id}`} passHref>
                <Nav.Link className={styles.nav__link}>{item.title}</Nav.Link>
                </Link>
                </Nav.Item>
              )
            })}
            
     


       
          
     
    </Nav>
  );
};
export default CustomNav;
