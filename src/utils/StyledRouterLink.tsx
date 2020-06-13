/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useMemo} from 'react';
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';
import Link, {LinkProps} from '@material-ui/core/Link';
import {Omit} from '@material-ui/types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export type StyledRouterLinkProps = { to: RouterLinkProps['to'], children: React.ReactNode, } & LinkProps;

export default function StyledRouterLink({to, children, ...linkProps}: StyledRouterLinkProps) {
    return (
        <Link component={RouterLink} to={to as any} {...linkProps}>
            {children}
        </Link>
    );
}


interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
}

export function ListItemLink(props: ListItemLinkProps) {
    const {icon, primary, to} = props;

    const renderLink = useMemo(
        () =>
            React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
                <RouterLink to={to} ref={ref} {...itemProps} />
            )),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
            </ListItem>
        </li>
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