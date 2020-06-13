import React from 'react';
import {Route, Switch} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {LinkItem} from "./types";
import {TodoListAppMenu} from "./todo/TodoApp";
import LinksMenuList from "./utils/LinksMenuList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        subSection: {
            "paddingLeft": "10%",
        },
        drawerContainer: {
            overflow: 'auto',
        },
    }),
);

const URL_PATHS = {
    HOME: "/",
    TODO_APP: "/todo-app"
}

export default function AppNavigationBar({items}: { items: LinkItem[] }) {
    const classes = useStyles();

    return (
        <div className={classes.drawerContainer}>
            <nav>
                <LinksMenuList
                    items={[
                        {to: URL_PATHS.HOME, primary: "Home",},
                        {to: URL_PATHS.TODO_APP, primary: "TodoApp",}
                    ]}
                />

                <Divider />

                <div className={classes.subSection}>
                    <Switch>
                        <Route exact path={URL_PATHS.HOME}>
                            <div />
                        </Route>
                        <Route path={URL_PATHS.TODO_APP}>
                            <TodoListAppMenu />
                        </Route>
                        <Route path="*">
                            <div />
                        </Route>
                    </Switch>
                </div>
            </nav>
        </div>
    )
}
