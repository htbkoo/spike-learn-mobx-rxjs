import React from "react";
import {Route, Switch, useRouteMatch,} from "react-router-dom";

import LinksMenuList from "../utils/LinksMenuList";

const URL_PATHS = {
    RX_JS: "rxjs"
}

function RxJsLearnAppMenu() {
    const match = useRouteMatch();

    return (
        <nav>
            <LinksMenuList
                items={[
                    {to: `${match.url}/${URL_PATHS.RX_JS}`, primary: "With RxJS"}
                ]}
            />
        </nav>
    )
}

function RxJsLearnApp() {
    const match = useRouteMatch();

    return (
        <div>
            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path={match.path}>
                    <h3>Please select an implementation.</h3>
                </Route>
                <Route path={`${match.path}/${URL_PATHS.RX_JS}`}>
                    <RxJsPlaygroundApp />
                </Route>
                <Route path="*">
                    <div />
                </Route>
            </Switch>
        </div>
    );
}

function RxJsPlaygroundApp(){
    return (
        <div>
            Try RxJS
        </div>
    )
}

export {
    RxJsLearnAppMenu,
    RxJsLearnApp,
};
