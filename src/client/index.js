import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import createlogger from 'redux-logger';

import * as sagas from './sagas';

import { MainRoute } from './routes'
import { reducer } from './store/reducer';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(
        sagaMiddleware,
        createlogger
    )
);

for (let saga of Object.values(sagas))
{

    sagaMiddleware.run(saga);

}


ReactDOM.render(
    <Provider store={store}>

        <MainRoute />
        
    </Provider>,

    document.querySelector("#Container")
);

store.dispatch({type:"INIT"});