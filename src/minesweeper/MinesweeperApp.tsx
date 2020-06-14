import React from "react";
import {Route, Switch, useRouteMatch,} from "react-router-dom";

import LinksMenuList from "../utils/LinksMenuList";
import PlainReactHookMinesweeperApp from "./PlainReactHookMinesweeperApp";

const URL_PATHS = {
    REACT_HOOKS: "react-hooks"
}

function MinesweeperAppMenu() {
    const match = useRouteMatch();

    return (
        <nav>
            <LinksMenuList
                items={[
                    {to: `${match.url}/${URL_PATHS.REACT_HOOKS}`, primary: "With React Hooks"}
                ]}
            />
        </nav>
    )
}

function MinesweeperApp() {
    const match = useRouteMatch();

    // A <Switch> looks through its children <Route>s and renders the first one that matches the current URL.
    return (
        <Switch>
            <Route exact path={match.path}>
                <h3>Please select an implementation.</h3>
            </Route>
            <Route path={`${match.path}/${URL_PATHS.REACT_HOOKS}`}>
                <PlainReactHookMinesweeperApp />
            </Route>
            <Route path="*">
                <div />
            </Route>
        </Switch>
    );
}


export {
    MinesweeperAppMenu,
    MinesweeperApp,
};