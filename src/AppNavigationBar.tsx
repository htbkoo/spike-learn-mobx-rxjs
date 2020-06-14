import React from 'react';
import {Route, Switch} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import LinksMenuList from "./utils/LinksMenuList";
import {ListItemLinkProps} from "./utils/StyledRouterLink";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        subSection: {
            color: theme.palette.primary.light
        },
        drawerContainer: {
            overflow: 'auto',
        },
    }),
);

export type AppNavigationBarProps = ListItemLinkProps & {
    subSectionMenu?: React.ReactNode;
};

export default function AppNavigationBar({items}: { items: AppNavigationBarProps[] }) {
    const classes = useStyles();

    return (
        <div className={classes.drawerContainer}>
            <nav>
                <LinksMenuList items={items} />

                <Divider />

                <div className={classes.subSection}>
                    <Switch>
                        {items.map(toSubSectionMenu)}
                        <Route path="*">
                            <div />
                        </Route>
                    </Switch>
                </div>
            </nav>
        </div>
    )
}

function toSubSectionMenu({to, subSectionMenu}: AppNavigationBarProps) {
    if (subSectionMenu) {
        return (
            <Route path={to}>
                {subSectionMenu}
            </Route>
        );
    } else {
        return "";
    }
}