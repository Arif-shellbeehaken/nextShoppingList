import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSection from '../components/NavbarSection';
import Footer from '../components/Footer';
import { SessionProvider } from "next-auth/react";
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useState, useEffect } from 'react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [manualLogged, setManualLogged] = useState({});
  useEffect(() => {
    const logData = localStorage.getItem("loginSession") && JSON.parse(localStorage.getItem("loginSession"));
    setManualLogged(logData);
  }, []);
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <NavbarSection manualLogged={manualLogged} />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
