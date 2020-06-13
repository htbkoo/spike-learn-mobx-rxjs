import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

import StyledRouterLink from "./utils/StyledRouterLink";
import {LinkItem} from "./types";

export default function AppNavigationBreadcrumbs({items}: { items: LinkItem[] }) {
    return (
        <nav>
            <Breadcrumbs aria-label="breadcrumb">
                {
                    items.map(toComponent)
                }
                {/*<Typography color="textPrimary">Breadcrumb</Typography>*/}
            </Breadcrumbs>
        </nav>
    )
}


function toComponent(item: LinkItem): React.ReactNode {
    if (item && (typeof item === 'object') && ('to' in item) && ('content' in item)) {
        // isLinkData, unable to extract due to Typescript limitation
        return (
            <StyledRouterLink to={item.to}>{item.content}</StyledRouterLink>
        )
    } else {
        return item;
    }
}