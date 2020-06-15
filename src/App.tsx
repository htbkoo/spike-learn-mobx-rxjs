import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import {TodoListApp, TodoListAppMenu} from "./todo/TodoListApp";
import ClippedResponsiveDrawer from "./ClippedResponsiveDrawer";
import AppNavigationBar, {AppNavigationBarProps} from "./AppNavigationBar";
import {ListItemLinkProps} from "./utils/StyledRouterLink";
import {MinesweeperApp, MinesweeperAppMenu} from "./minesweeper/MinesweeperApp";
import { getFirstPartPath } from "./utils/routerUtils";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appContainer: {},
    }),
);

interface AppConfiguration {
    path: ListItemLinkProps['to'];
    linkText: ListItemLinkProps['primary'];
    appComponent: React.ReactNode;
    subSectionMenu?: AppNavigationBarProps['subSectionMenu'];
    title?: string;
    isPathExact?: boolean;
}

const APP_CONFIGURATIONS: AppConfiguration[] = [
    {
        path: "/",
        linkText: "Home",
        appComponent: (<h3>Please select an app.</h3>),
        isPathExact: true,
        title: "spike-learn-mobx-rxjs"
    },
    {
        path: "/todo-app",
        linkText: "TodoApp",
        appComponent: (<TodoListApp />),
        subSectionMenu: (<TodoListAppMenu />),
        title: "TODO APP"
    },
    {
        path: "/minesweeper-app",
        linkText: "MinesweeperApp",
        appComponent: (<MinesweeperApp />),
        subSectionMenu: (<MinesweeperAppMenu />),
        title: "MINESWEEPER APP"
    },
]

const App: React.FC = () => {
    const classes = useStyles();
    const match = useRouteMatch();

    return (
        <div className={classes.appContainer}>
            <ClippedResponsiveDrawer
                title={`${getTitle(match.url)}`}
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

function toNavigationItem({path, linkText, subSectionMenu}: AppConfiguration): AppNavigationBarProps {
    return {
        to: path,
        primary: linkText,
        subSectionMenu
    };
}

function toRoute({appComponent, path, isPathExact}: AppConfiguration) {
    return (
        <Route exact={isPathExact} path={path} key={path}>
            {appComponent}
        </Route>
    )
}

// TODO: extract to util.ts and add tests
function getTitle(pathname: string): string {
    const pathFirstPart = getFirstPartPath(pathname)
    const matchedConfig = APP_CONFIGURATIONS.find(({path}) => path === pathFirstPart);

    return matchedConfig?.title ?? "";
}

export default App;
