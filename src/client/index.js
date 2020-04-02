import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import { priceCalculation } from './sagas/priceCalculation';
import { submitCheckout } from './sagas/submitCheckout';
import { MainRoute } from './routes/main'
import { reducer } from './store/reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(priceCalculation);
sagaMiddleware.run(submitCheckout);

ReactDOM.render(
    <Provider store={store}>

        <MainRoute />
        
    </Provider>,

    document.querySelector("#Container")
);

store.dispatch({type:"INIT"});