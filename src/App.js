import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import Header from './components/Header';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routes />
    </BrowserRouter>
  );
}

export default App;
