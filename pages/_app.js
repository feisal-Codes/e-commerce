import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "../utils/Store";
import NextNprogress from 'nextjs-progressbar';




function MyApp({ Component, pageProps }) {

  return (
    <StoreProvider>
      <NextNprogress  color="#9120EE" />
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
