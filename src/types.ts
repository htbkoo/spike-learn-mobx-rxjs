import React from "react";

import {StyledRouterLinkProps} from "./utils/StyledRouterLink";

export interface LinkData {
    to: StyledRouterLinkProps["to"],
    content: StyledRouterLinkProps["children"]
}

export type LinkItem = LinkData | React.ReactNode;