import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';

// import { history } from '../../store/history';

import { OrderRoute } from '../order';
import { CheckoutRoute } from '../checkout';
import { WelcomeRoute } from '../welcome';

import './main.css';

export const MainRoute = connect(state=>state)(({currentRoute})=>(
    <div className="main">
        <h1>
            Katie's Custom Cakes
        </h1>
        {/* <Router history={history}> */}
        <Router>

            <Route path="/" exact >

                <WelcomeRoute />
            </Route>

            <Route path="/order">

                <OrderRoute />

            </Route>

            <Route path="/checkout">

                <CheckoutRoute />

            </Route>

        </Router>
        {/* {{
            ["ORDER"]:<OrderRoute />,
            ["CHECKOUT"]:<CheckoutRoute />
        }[currentRoute]} */}
    </div>
    
))