import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSection from '../components/NavbarSection';
import Footer from '../components/Footer';
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '../redux/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <NavbarSection />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
