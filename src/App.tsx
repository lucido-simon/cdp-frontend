import React from 'react';
import './App.css';

import { apiService } from './services/APIService';

function App() {
  apiService.getProducts().then(console.log);
  apiService.getOrders().then(console.log);

  return (
    <div>
      <h1>Polystore</h1>
    </div>
  );
}

export default App;
