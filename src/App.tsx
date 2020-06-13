import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import {TodoListApp} from "./todo/TodoListApp";
import ClippedResponsiveDrawer from "./ClippedResponsiveDrawer";
import AppNavigationBar from "./AppNavigationBar";
import {ListItemLinkProps} from "./utils/StyledRouterLink";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appContainer: {},
    }),
);

interface AppConfiguration {
    path: ListItemLinkProps['to'];
    linkText: ListItemLinkProps['primary'];
    appComponent: React.ReactNode;
    title?: string;
    isPathExact?: boolean;
}

const APP_CONFIGURATIONS: AppConfiguration[] = [
    {path: "/", linkText: "Home", appComponent: (<h3>Please select an app.</h3>), isPathExact: true},
    {path: "/todo-app", linkText: "TodoApp", appComponent: (<TodoListApp />), title: ": TODO APP"}
]

const App: React.FC = () => {
    const classes = useStyles();
    const match = useRouteMatch();

    return (
        <div className={classes.appContainer}>
            <ClippedResponsiveDrawer
                title={`spike-learn-mobx-rxjs ${getTitle(match.url)}`}
                drawerContent={<AppNavigationBar items={APP_CONFIGURATIONS.map(toNavigationItem)} />}
            >
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                    {APP_CONFIGURATIONS.map(toRoute)}
                    <Route path="*">
                        <div />
                    </Route>
                </Switch>
            </ClippedResponsiveDrawer>
        </div>
    );
};

function toNavigationItem({path, linkText,}: AppConfiguration): ListItemLinkProps {
    return {
        to: path,
        primary: linkText,
    };
}

function toRoute({appComponent, path, isPathExact}: AppConfiguration) {
    return (
        <Route exact={isPathExact} path={path}>
            {appComponent}
        </Route>
    )
}

// TODO: extract to util.ts and add tests
function getTitle(pathname: string): string {
    const startIndex = pathname.indexOf("/");
    const endIndex = pathname.indexOf("/", startIndex + 1);
    const pathFirstPart = pathname.substring(startIndex, endIndex !== -1 ? endIndex : pathname.length);

    const matchedConfig = APP_CONFIGURATIONS.find(({title}) => title === pathFirstPart);

    return matchedConfig?.title ?? "";
}

export default App;
