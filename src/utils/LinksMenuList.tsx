import React from 'react';
import List from "@material-ui/core/List";

import {ListItemLink, ListItemLinkProps} from "./StyledRouterLink";

export default function LinksMenuList({items}: { items: ListItemLinkProps[] }) {
    return (
        <List>
            {items.map((item,) => (
                <ListItemLink {...item} key={item.to} />
            ))}
        </List>
    )
}
