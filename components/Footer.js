import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import styles from "../styles/components/footer.module.css";


const Footer = () => {
  return (
    <div
     className={styles.footer__container}
    >
      <div
        className={styles.footer__sections}
      >
        <div className={styles.footer__section}>
          <p>Help</p>
          <p>Contact</p>
          <p>About</p>

          
        </div>
        <div className={styles.footer__section}>
          <p>Privacy Policy</p>
          <p>Returns Policy</p>
          <p>Location</p>
         
        </div>
        <div className={styles.footer__section}>
          <p>New Releases</p>
          <p>Featured Products</p>
          <p>Popular Products </p>
         
        </div>
        
       
      </div>
      <hr style={{ color: "#AD9F9F" }} />
      <div>
        <div
          className={styles.footer__socials}
        >
          <div>
            <FaFacebook size={25} style={{ color: "#ffffff" }} />
          </div>
          <div>
            <FaInstagram size={25} style={{ color: "#ffffff" }} />
          </div>

          <div>
            <FaTwitter size={25} style={{ color: "#ffffff" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
