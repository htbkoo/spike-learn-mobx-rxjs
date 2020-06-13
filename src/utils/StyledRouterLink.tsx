/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';
import Link, {LinkProps} from '@material-ui/core/Link';
import {Omit} from '@material-ui/types';

export type StyledRouterLinkProps = { to: RouterLinkProps['to'], children: React.ReactNode, } & LinkProps;

export default function StyledRouterLink({to, children, ...linkProps}: StyledRouterLinkProps) {
    return (
        <Link component={RouterLink} to={to as any} {...linkProps}>
            {children}
        </Link>
    );
}

export function NoPropsForwardingLink({to, children, ...linkProps}: StyledRouterLinkProps) {
    return (
        <Link component={createLinkBehavior(to)} {...linkProps}>
            {children}
        </Link>
    )
}

function createLinkBehavior(to: RouterLinkProps['to']) {
    return React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
        <RouterLink ref={ref} to={to} {...props} />
    ))
}