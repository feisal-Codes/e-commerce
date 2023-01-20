import Layout from "../../components/Layout";
import Image from "next/image";

import config from "../../utils/config";
import fetcher from "../../utils/fetcher";
import Router, { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import CustomNav from "../../components/Nav";
import ProductCard from "../../components/ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../../styles/pages/Category.module.css";
import productstyles from "../../styles/pages/homepage.module.css";

function Category(props) {
  const router = useRouter();
  console.log(props.data);

  const [data, setData] = useState(props.data.content);
  const [pageCount, setPageCount] = useState(props.data.totalPages);
  
  const [error, setError] = useState(false);


  useEffect(() => {
    if (props.data) {
      if (props.data.error) {
        setError(props.data.error.message);
      } else {
        // Set users from userData
        setData(props.data.content);
        setPageCount(props.data.totalPages);
      }
    }
  }, [props.data]);

  const handlePageChange = page => {
    const path = router.pathname;
    const query = router.query;
    query.page = page.selected;
    router.push({
      pathname: path,
      query: query,
    });
  };

  if (error) {
    return <h3>{error}</h3>;
  }

  
  console.log("component state.....");
  console.log(data);

  if (data.length <= 0) {
    return (
      <Layout>
        <h2 style={{ textAlign: "center" }}>
          {" "}
          no products found for this category
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <Row className={styles.banner}>
      <Image src="/shoes1.jpg" width="1380px" height="270px" layout="intrinsic" alt="shoes image"/>

        <Col xs={12} sm={5} className={styles.banner__textContainer}>
          <Container fluid className={styles.banner__text}>

            <h1>Sneakers</h1>
            <p>
              On SnickerWorld, every sneaker you want is always available and
              authentic. Buy and sell new sneakers & shoes from Air Jordan,
              adidas, Nike, Yeezy and more!
            </p>
          </Container>
        </Col>
      </Row>
      <div className={styles.customnav}>

        <CustomNav />
      </div>


      <Container fluid className={productstyles.products}>
        <Row sm={6} xs={2}>
          {data.map(item => {
            return (
              <Col key={item.id}>
                <ProductCard
                  // productImage={item.productImages[0].imageUrl.img_url}
                  productImage={"/shirt.webp"}
                  productname={item.title}
                  price={item.price}
                  productid={item.id}
                  product={item}
                />
              </Col>
            );
          })}
        </Row>
      </Container>

      <ReactPaginate
        pageCount={pageCount}
        pageRange={2}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"container"}
        previousLinkClassName={"previous"}
        breakClassName={"page"}
        nextLinkClassName={"next"}
        pageClassName={"page"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
        hoverClassName={"hover"}
      />
    </Layout>
  );
}

export default Category;

export async function getServerSideProps({ query }) {
  const { productsCategory } = config;
  const page = query.page || 0;
  let category = query.category;
  let size = 10;
  const URL = `${productsCategory}${category}&page=${page}&size=${size}?`;

  const data = await fetcher(URL);

  if (data.status === 401) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
    },
  };
}
