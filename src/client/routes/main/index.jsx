import React from 'react';
import { connect } from 'react-redux';

import { OrderRoute } from '../order';
import { CheckoutRoute} from '../checkout';

export const MainRoute = connect(state=>state)(({currentRoute})=>(
    <div>
        <h1>
            Katie's Custom Cakes
        </h1>
        {{
            ["ORDER"]:<OrderRoute />,
            ["CHECKOUT"]:<CheckoutRoute />
        }[currentRoute]}
    </div>
    
))