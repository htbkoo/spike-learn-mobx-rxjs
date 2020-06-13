import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {TodoListApp, TodoListAppMenu} from "./todo/TodoApp";
import AppNavigationBreadcrumbs from "./AppNavigationBreadcrumbs";
import ClippedResponsiveDrawer from "./ClippedResponsiveDrawer";
import AppNavigationBar from "./AppNavigationBar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appContainer: {
            // "backgroundColor": theme.palette.background.default,
            // "minHeight": "100vh",
            // "display": "flex",
            // "flexDirection": "row",
            // "alignItems": "center",
            // "justifyContent": "center",
            // "fontSize": "calc(10px + 2vmin)",
            // "color": theme.palette.primary.main
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
                <ClippedResponsiveDrawer
                    title="spike-learn-mobx-rxjs"
                    drawerContent={

                        <AppNavigationBar
                            items={[
                                {to: URL_PATHS.HOME, content: "Home"},
                                {to: URL_PATHS.TODO_APP, content: "TodoApp"},
                            ]}
                        />
                    }
                >
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
                </ClippedResponsiveDrawer>
            </div>
        </Router>
    );
};

export default App;
