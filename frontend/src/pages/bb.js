import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Pobranie danych z endpointu /api/test w backendzie
    axios.get('http://localhost:8080/api/test')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych z backendu:', error);
      });
  }, []);

  return (
    <div>
      <h1>Testowanie połączenia</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
