import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Properties from './components/Property/Properties';
import Property from './components/Property/Property';
import Landlords from './components/Landlord/Landlords';
import Landlord from './components/Landlord/Landlord';
import Address from './components/Address/Address';
import Addresses from './components/Address/Addresses';
import NotFound from './components/NotFound';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="api/v1/properties" element={<Properties />} >
            <Route path=":propertiesId" element={<Property />} />
          </Route>
          <Route path="api/v1/landlords" element={<Landlords />} >
            <Route path=":landlordsId" element={<Landlord />} />
          </Route>
          <Route path="api/v1/addresses" element={<Addresses />} >
            <Route path=":addressesId" element={<Address />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
