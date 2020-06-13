import React from "react";
import {Route, Switch, useRouteMatch,} from "react-router-dom";

import PlainReactHookTodoApp from "./PlainReactHookTodoApp";
import StyledRouterLink from "../utils/StyledRouterLink";

const URL_PATHS = {
    REACT_HOOKS: "react-hooks"
}

function TodoListAppMenu() {
    const match = useRouteMatch();

    return (
        <nav>
            <ul>
                <li>
                    <StyledRouterLink to={`${match.url}/${URL_PATHS.REACT_HOOKS}`}>With React Hooks</StyledRouterLink>
                </li>
            </ul>
        </nav>
    )
}

function TodoListApp() {
    const match = useRouteMatch();

    return (
        <div>
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


export {
    TodoListAppMenu,
    TodoListApp,
};