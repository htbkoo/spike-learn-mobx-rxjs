import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";

import PlainReactHookTodoApp from "./PlainReactHookTodoApp";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appContainer: {
            "backgroundColor": theme.palette.background.default,
            "minHeight": "100vh",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "justifyContent": "center",
            "fontSize": "calc(10px + 2vmin)",
            "color": theme.palette.primary.main
        },
    }),
);

const URL_PATHS = {
    // TODO: improve this
    REACT_HOOKS: "react-hooks"
}

function TodoListApp() {
    const match = useRouteMatch();

    console.log(`url: ${match.url}`)
    console.log(`path: ${match.path}`)

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to={`${match.url}/${URL_PATHS.REACT_HOOKS}`}>With React Hooks</Link>
                    </li>
                </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
                <Route path={`${match.path}/${URL_PATHS.REACT_HOOKS}`}>
                    <PlainReactHookTodoApp />
                </Route>
                <Route path="*">
                    <div/>
                </Route>
            </Switch>
        </div>
    );
}


export default TodoListApp;