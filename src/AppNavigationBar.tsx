import React from 'react';
import StyledRouterLink from "./utils/StyledRouterLink";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import {LinkItem} from "./types";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {TodoListApp, TodoListAppMenu} from "./todo/TodoApp";
import ClippedResponsiveDrawer from "./ClippedResponsiveDrawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        subSection: {
            "paddingLeft": "10%",
        },
    }),
);

const URL_PATHS = {
    HOME: "/",
    TODO_APP: "/todo-app"
}

export default function AppNavigationBar({items}: { items: LinkItem[] }) {
    const classes = useStyles();

    const match = useRouteMatch();

    return (
        <nav>
            <ul>
                <li>
                    <StyledRouterLink to={URL_PATHS.HOME}>Home</StyledRouterLink>
                </li>
                <li>
                    <StyledRouterLink to={URL_PATHS.TODO_APP}>TodoApp</StyledRouterLink>
                </li>
            </ul>
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
    )
}
