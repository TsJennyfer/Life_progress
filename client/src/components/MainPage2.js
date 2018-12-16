// To jest główny element w react
// W nim będą renderowane: header i treść główna
// Tutaj również są trzymane dane = stany
import Protected from './Protected';
import Public from './Public';
import Rejestracja from './Rejestracja';
import Logowanie from './Logowanie';
import CelDynamicznie2 from './CelDynamicznie2';
import UserProfile from './UserProfile';
import TermsPolicy from './TermsPolicy';

import {createStore, combineReducers, applyMiddleware} from "redux";
import logger from "redux-logger";
import {Provider} from "react-redux";


import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Header from './Header';

class MainPage2 extends React.Component { 
    render() {
        return (
            <Router>
                <div >
                <Provider store={store}><Header /> </ Provider>
                    <Route exact path="/" component={Public} />
                    <Route exact path="/protected" component={Protected} />
                    <Route path="/register" component={Rejestracja} />
                    <Route path="/signin" component={Logowanie} />
                    <Route exact path="/protected/:goal" component={CelDynamicznie2} />
                    <Route path="/userProfile" component={UserProfile} />
                    <Route path="/TermsPolicy" component={TermsPolicy} />
                </div>
            </Router>
        )
    }
}
export default MainPage2;

    
const mathReducer = (state = {
    result: 1,
    lastValues: []
}, action) => {
    switch (action.type) {
        case "ADD":
            state = {
                ...state,
                result: state.result + action.payload,
                lastValues: [...state.lastValues, action.payload]
            };
            break;
    }
    return state;
};

const userReducer = (state = {
    counter: 0
}, action) => {
    switch (action.type) {
            case "REFRESH_HEADER":
            state = {
                ...state,
                counter: state.counter + 1
            };
            break;
    }
    return state;
};

const myLogger = (store) => (next) => (action) => {
    console.log("Logged Action: ", action);
    next(action);
};

const store = createStore(
    combineReducers({math: mathReducer, user: userReducer}),
    {},
    applyMiddleware(logger)
);

export const refreshHeader = () => store.dispatch({
    type: "REFRESH_HEADER",
    payload: "Artur"
});

store.subscribe(() => {
    console.log("Store updated!", store.getState());
});
