import Layout from "../components/Layout";
import Image from "next/image";

import Cookies from "js-cookie";
import config from "../utils/config";
import fetcher from "../utils/fetcher";

import CustomNav from "../components/Nav";
import ProductCard from "../components/ProductCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "../styles/pages/homepage.module.css";

const Homepage = ({
  categoryData,
  newArrivalsData,
  featuredProducts,
  popularProducts,
}) => {
  Cookies.set("category", JSON.stringify(categoryData));
  Cookies.set("newProducts", JSON.stringify(newArrivalsData));
  Cookies.set("newProducts", JSON.stringify(featuredProducts));

  console.log(newArrivalsData);
  console.log(featuredProducts);

  return (
    <Layout>
      <Image src="/banner.jpg" width="1380px" height="600px" alt="site logo" />

      <CustomNav />

      <div>
        <Col xs={12} className={styles.product_title}>
          <h5>New Arrivals</h5>
          <h6>See All</h6>
        </Col>
      </div>

      <Container fluid className={styles.products}>
        <Row sm={6} xs={2}>
          {newArrivalsData.content.slice([0], [6]).map(item => {
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
      <div>
        <Col xs={12} className={styles.product_title}>
          <h5>Popular Products</h5>
          <h6>See All</h6>
        </Col>
      </div>

      <Container fluid className={styles.products}>
        <Row sm={6} xs={2}>
          {popularProducts.slice([0], [6]).map(item => {
            return (
              <Col  key={item.id}>
                <ProductCard
                  // productImage={item.productImages[0].imageUrl.img_url}
                  productImage={"/image.jpg"}
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
      <div>
        <Col xs={12} className={styles.product_title}>
          <h5>Featured Products</h5>
          <h6>See All</h6>
        </Col>
      </div>

      <Container fluid  className={styles.products}>
        <Row sm={6} xs={2}>
          {featuredProducts.content.slice([0], [6]).map(item => {
            return (
              <Col  key={item.id}>
                <ProductCard
                  // productImage={item.productImages[0].imageUrl.img_url}
                  productImage={"/shoes.jpg"}
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
    </Layout>
  );
};

export default Homepage;

export async function getServerSideProps() {
  const { newArrivals, categories, featured, popular } = config;

  const categoryData = await fetcher(categories);
  const newArrivalsData = await fetcher(newArrivals);
  const featuredProducts = await fetcher(featured);
  const popularProducts = await fetcher(popular);

  if (
    categoryData.status === 401 ||
    newArrivalsData.status === 401 ||
    featuredProducts.status === 401
  ) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      categoryData,
      newArrivalsData,
      featuredProducts,
      popularProducts,
    },
  };
}

// let data = null;
// let newProductsData = null;

// const response = await fetch(url);
// const category = await response.json();

// // if (error) {
// //   return {
// //     notFound: true,
// //   };
// // }

// return {
//   props: {
//     data: category,
//   },
// };
// async function fetcher(URL) {
//   let mydata = null;
//   try {
//     const res = await fetch(URL);

//     if (res.status !== 200) {
//       throw new Error("Failed to fetch");
//     }

//     return (mydata = await res.json());
//   } catch (err) {
//     return (mydata = { error: { message: err.message } });
//   }
// }
// data = await fetcher(categoryUrl);
// newProductsData = await fetcher(newProductsurl);

// if (data.error || newProductsData.error){
//   return {
//     notFound: true,
//   }
// }
// // Pass data to the page via props
// console.log(newProductsData);
