import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {Route, Switch, useRouteMatch} from "react-router-dom";

import {TodoListApp} from "./todo/TodoListApp";
import ClippedResponsiveDrawer from "./ClippedResponsiveDrawer";
import AppNavigationBar from "./AppNavigationBar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appContainer: {},
    }),
);

const URL_PATHS = {
    HOME: "/",
    TODO_APP: "/todo-app"
}

const TITLES = {
    [URL_PATHS.HOME]: "",
    [URL_PATHS.TODO_APP]: ": TODO APP",

}

const App: React.FC = () => {
    const classes = useStyles();
    const match = useRouteMatch();

    return (
        <div className={classes.appContainer}>
            <ClippedResponsiveDrawer
                title={`spike-learn-mobx-rxjs ${getTitle(match.url)}`}
                drawerContent={
                    <AppNavigationBar
                        items={[
                            {to: URL_PATHS.HOME, primary: "Home",},
                            {to: URL_PATHS.TODO_APP, primary: "TodoApp",}
                        ]}
                    />
                }
            >
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path={URL_PATHS.HOME}>
                        <h3>Please select an app.</h3>
                    </Route>
                    <Route path={URL_PATHS.TODO_APP}>
                        <TodoListApp />
                    </Route>
                    <Route path="*">
                        <div />
                    </Route>
                </Switch>
            </ClippedResponsiveDrawer>
        </div>
    );
};

// TODO: extract to util.ts and add tests
function getTitle(pathname: string): string {
    const startIndex = pathname.indexOf("/");
    const endIndex = pathname.indexOf("/", startIndex + 1);
    const pathFirstPart = pathname.substring(startIndex, endIndex !== -1 ? endIndex : pathname.length);

    const matchedKey = Object.keys(TITLES)
        .find(key => key === pathFirstPart);

    if (matchedKey) {
        return TITLES[matchedKey];
    } else {
        return "";
    }
}

export default App;
