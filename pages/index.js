import ShoppingList from '../components/ShoppingList';
import ItemModal from '../components/ItemModal';
import { Container } from 'reactstrap';
import { useEffect, useState } from 'react';

export default function Home() {
  const [manualLogged, setManualLogged] = useState({});
  useEffect(() => {
    const logData = localStorage.getItem("loginSession") && JSON.parse(localStorage.getItem("loginSession"));
    setManualLogged(logData);
  }, []);

  return (
    <main>
      <Container>
        {/* <ItemModal /> */}
        <ShoppingList manualLogged={manualLogged} />
      </Container>
    </main>
  );
}
