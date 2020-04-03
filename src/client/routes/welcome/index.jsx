import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withCartId } from '../../components/mixins/withCartId';

export const WelcomeRoute = connect()(()=>(
    
    <div>

        <h2>
            Thanks for choosing Katie's custom cakes!
        </h2>
        <p>
            Cooking custom cakes since the century started!
        </p>

        <ContinueOrder/>

    </div>
))

const ContinueOrder = withCartId(()=>(
    
    <div>

        <p>You have an order in progress.</p>

        <Link to="/order">

            <button>

                Continue Your Order

            </button>

        </Link>

    </div>

))