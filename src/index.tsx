import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import App from './App';
import * as serviceWorker from './serviceWorker';
import {createMyMuiTheme} from "./muiThemeFactory";
import {getBasename} from "./utils/routerUtils";

import './index.css';

const myMuiTheme = createMyMuiTheme();

ReactDOM.render((
    <ThemeProvider theme={myMuiTheme}>
        <Router basename={getBasename()}>
            <Switch>
                <Route path="*">
                    <App />
                </Route>
            </Switch>
        </Router>
    </ThemeProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
