import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import TodoListApp from "./todo/TodoApp";
import StyledRouterLink from "./utils/StyledRouterLink";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appContainer: {
            "backgroundColor": theme.palette.background.default,
            "minHeight": "100vh",
            "display": "flex",
            "flexDirection": "column",
            // "alignItems": "center",
            // "justifyContent": "center",
            "fontSize": "calc(10px + 2vmin)",
            "color": theme.palette.primary.main
        },
    }),
);

const URL_PATHS = {
    HOME: "/",
    TODO_APP: "/todo-app"
}

const App: React.FC = () => {
    const classes = useStyles();

    return (
        <Router>
            <div className={classes.appContainer}>
                <nav>
                    <ul>
                        <li>
                            <StyledRouterLink to={URL_PATHS.HOME}>Home</StyledRouterLink>
                        </li>
                        <li>
                            <StyledRouterLink to={URL_PATHS.TODO_APP}>TodoApp</StyledRouterLink>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path={URL_PATHS.HOME}>
                        <div />
                    </Route>
                    <Route path={URL_PATHS.TODO_APP}>
                        <TodoListApp />
                    </Route>
                    <Route path="*">
                        <div />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

function AppNavigationBar() {

}

export default App;
