// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Properties from './components/Property/Properties';
import Property from './components/Property/Property';
import Landlords from './components/Landlord/Landlords';
import Landlord from './components/Landlord/Landlord';
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
