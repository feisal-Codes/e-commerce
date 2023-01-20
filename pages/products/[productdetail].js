import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Layout from "../../components/Layout";
import Badge from "react-bootstrap/Badge";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import config from "../../utils/config";
import fetcher from "../../utils/fetcher";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Toast from "react-bootstrap/Toast";
import Select from "react-dropdown-select";
import styles from "../../styles/pages/productDetail.module.css";


import CustomCarousel from "../../components/CustomCarousel";
const ProductDetail = ({ data, relatedProducts, sizes }) => {
  // const router = useRouter();
  // console.log(router.query);
 

  const [product, setProduct] = useState(data);
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [isShoes, setisShoes]= useState(data.category.title==="Shoes" ? true : false)
  const [options, setOptions] = useState(sizes);

  const { state, dispatch } = useContext(Store);

  // const [buttonDisable, setbuttonDisable]= useContext(true)


  useEffect(() => {
    setProduct(data)
    setSelectedOptions([])
  }, [data])

  const handleAddToCart = product => {
    const itemExists = state.cart.cartItems.find(
      item => item.id === product.id
    );
    const quantity = itemExists ? itemExists.quantity + 1 : 1;
    dispatch({ type: "addToCart", payload: { ...product, quantity } });
    setShow(true);
  };

  

  if (selectedOptions.length !== 0 ){
    console.log(selectedOptions[0].label);


  }


  return (
    <Layout>
      <Container fluid>
        <Row className= {styles.product__container}>
          <Col xs={1}> </Col>
          <Col className={styles.product__imageContainer} xs={10} md={5}>
            <Container fluid className={styles.product__imageContainer}>
              <Container fluid className={styles.product__imageContainer}>
                <Image
                  src="/shoes.jpg"
                  alt="product image"
                  width="600px"
                  height="500px"
                  layout="responsive"
                />
              </Container>
            
            </Container>
          </Col>
          <Col className="mx-auto " xs={12} md={5}>
            <Container fluid>
              <Row>
                <div >
                  {/* <Toast
                    style={{
                      backgroundColor: "white",
                      // position: "fixed",
                      // Top: "0",
                      // left: "0",
                      color: "black",
                      zIndex: "999",
                      
                    }}
                    show={show}
                    onClose={() => setShow(false)}
                    delay={1500}
                    autohide
                  >
                    <Toast.Body>
                      Added to cart{" "}
                      <AiOutlineShoppingCart style={{ color: "black" }} />
                    </Toast.Body>
                  </Toast> */}
                  <Badge pill bg="warning" text="dark">
                    sale!
                  </Badge>
                  { isShoes &&   <div className={styles.product__size}>
                  <h2 >Size</h2>
                  <Select
                  placeholder="Choose size"
                    options={options.map((item) => {
                      return { value: item.id, label: item.size };
                    })}
                    values={selectedOptions}
                    onChange={values => {
                      setSelectedOptions([...values]);
                    }}
                  />{" "}
                  </div>   }
                  
                  <h2>{product.title}</h2>
                </div>
              </Row>
              <Row>
                <p>{product.description}</p>
              </Row>
              <Row>
                <p>{`Brand: ${product.brand}`}</p>
              </Row>{" "}
              <Row>
                <h6>{`ksh:${product.price}`}</h6>
              </Row>
              <Row>
                {isShoes &&  
                <Button
                  disabled = {selectedOptions.length !== 0 ? false : true}
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                  className={styles.product__cartButton}
                  style={{backgroundColor:"black", color:"white"}}
                >
                  Add to Cart
                  <AiOutlineShoppingCart size={18} style={{ color: "white" }} />
                </Button>
}
        {!isShoes && 
        
        <Button
       
        onClick={() => {
          handleAddToCart(product);
        }}
        className={styles.product__cartButton}
        style={{backgroundColor:"black", color:"white"}}
      >
        Add to Cart
        <AiOutlineShoppingCart size={18} style={{ color: "white" }} />
      </Button>
        }
              </Row>
            
            </Container>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10} style={{ margin: "0 auto" }}>
            <hr style={{ marginBottom: "0" }} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={3}>
          <div className={styles.product__titleContainer}>
              <h6 className={styles.product__title} >
                Product Details
              </h6>
            </div>
          </Col>

          <Row>
            <Col sm={1}></Col>
            <Col xs={12} sm={4}>
              <Row>
                <div
                 className={styles.product__detail}
                >
                  <p>price</p>
                  <p>ksh1228</p>
                </div>
              </Row>
              <Row>
                <div
                 className={styles.product__detail}
                 >
                  <p>condition</p>
                  <p>New</p>
                </div>
              </Row>
              <Row>
              <div
                 className={styles.product__detail}
                 >
                
                  <p>Release date</p>
                  <p>Originally released in 2006</p>
                </div>
              </Row>
              <Row>
              <div
                 className={styles.product__detail}
                 >
                  <p>size</p>
                  <p>43 </p>
                </div>
              </Row>
              <Row>
              <div
                 className={styles.product__detail}
                 >
                  <p>Color</p>
                  <p>black</p>
                </div>
              </Row>
            </Col>
            <Col xs={1}></Col>
            <Col xs={12} sm={5} >
              <div className={styles.product__desc}>
                <h6>Product Description</h6>
                <p>
                  Originally released in 2006, the Air Jordan 4 Retro Lightning
                  (2021) is one of the most renowned retro Jordan 4 colorways in
                  Jordan Brands catalog. It features a Tour Yellow Durabuck
                  upper with black netted panels and dark grey eyelets. On the
                  tongue, a black Jordan
                </p>
              </div>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col xs={12} sm={10} style={{ margin: "0 auto" }}>
            <hr style={{ marginBottom: "0" }} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={3}>
            <div className={styles.product__titleContainer}>
            <h6 className={styles.product__title} >

              
                Related Products
              </h6>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={10} style={{ margin: "0 auto" }}>
            <CustomCarousel relatedProducts={relatedProducts.content} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProductDetail;

export async function getServerSideProps(context) {
  const { params } = context;
  const { productdetail } = params;
  const { singleProduct } = config;

  const URL = `${singleProduct}${productdetail}`;
  const relatedProducts = await fetcher(
    `http://172.104.141.50:8096/products/related-products/${productdetail}`
  );
  const sizes = await fetcher("http://172.104.141.50:8096/sneakers/sizes");


  const data = await fetcher(URL);

  if (
    data === undefined ||
    sizes === undefined ||
    relatedProducts === undefined ||
    data.httpStatus === 500 ||
    relatedProducts.httpStatus === 500 ||
    data.status === 401 ||
    relatedProducts.status === 401
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      relatedProducts,
      sizes,
    },
  };
}
