import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {MemoryRouter as Router, Route, Switch} from "react-router-dom";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render((
        <Router>
            <Switch>
                <Route path="*">
                    <App />
                </Route>
            </Switch>
        </Router>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
});
