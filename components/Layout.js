import Footer from "./Footer";
import Navbar from "./Navbar";
import styles from "../styles/components/customnav.module.css";


const Layout = ({children}) => {

  
  return (
    <div className={styles.layout} >
      <Navbar />
      {children}
      <Footer />
      </div>  );
};

export default Layout;
