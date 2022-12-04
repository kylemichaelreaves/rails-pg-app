import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import Properties from '../components/Property/Properties';
import Property, {loader as propertyLoader} from '../components/Property/Property';
import Landlords from '../components/Landlord/Landlords';
import Landlord from '../components/Landlord/Landlord';
import Address from '../components/Address/Address';
import Addresses from '../components/Address/Addresses';
import Map from '../components/Map/Map'
import NotFound from '../components/NotFound';
import App from '../components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const ROUTER_PREFIX = 'api/v1';

const router = createBrowserRouter([
        {
            path: '/',
            element: <App/>,
            errorElement: <NotFound/>,
            children: [
                {
                    path: `${ROUTER_PREFIX}/properties`,
                    element: <Properties/>,
                },
                {
                    path: `${ROUTER_PREFIX}/properties/:propertyId`,
                    element: <Property/>,
                    loader: async ({params}) => {
                        return fetch(`/${ROUTER_PREFIX}/properties/${params.propertyId}`);
                    },
                },
                {
                    path: `${ROUTER_PREFIX}/landlords`,
                    element: <Landlords/>,
                },
                {
                    path: `${ROUTER_PREFIX}/landlords/:landlordId`,
                    element: <Landlord/>,
                },
                {
                    path: `${ROUTER_PREFIX}/addresses`,
                    element: <Addresses/>,
                },
                {
                    path: `${ROUTER_PREFIX}/addresses/:addressId`,
                    element: <Address/>,
                },
                {
                    path: `${ROUTER_PREFIX}/map`,
                    element: <Map/>,
                },
                {
                    path: '*',
                    element: <NotFound/>,
                },
            ],
        },
    ],
);

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
);
