import * as React from 'react';
import { useEffect, useState } from 'react';
import { Redirect, Route, RouteProps, useHistory, useLocation, useRouteMatch } from 'react-router';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';

interface ProtectedRouteProps extends RouteProps {
    isAllowed: boolean;
    restrictedPath: string;
    authenticationPath: string;
    test?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...props }) => {
    if (!Component) return null;

    const history = useHistory();
    const routeMatch = useRouteMatch();
    const location = useLocation();

    const [cookies] = useCookies(['token']);
    const [redirectPath, setRedirectPath] = useState(() => {
        if (!cookies.token) {
            return props.authenticationPath;
        }
        if (!!cookies.token && !props.isAllowed) {
            return props.restrictedPath;
        }
    });

    useEffect(() => {
        setRedirectPath('');

        if (!cookies.token) {
            setRedirectPath(props.authenticationPath);
        }
        if (!!cookies.token && !props.isAllowed) {
            setRedirectPath(props.restrictedPath);
        }
    });

    return (
        <Route
            {...props}
            render={() => {
                if (redirectPath == '') {
                    return <Component history={history} match={routeMatch} location={location} />;
                } else {
                    return <Redirect to={{ pathname: redirectPath, state: { from: props.location } }} />;
                }
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    isAllowed: PropTypes.bool.isRequired,
    restrictedPath: PropTypes.string.isRequired,
    authenticationPath: PropTypes.string.isRequired,
    test: PropTypes.bool,
    component: PropTypes.any,
    location: PropTypes.any,
};

export default ProtectedRoute;
export type { ProtectedRouteProps };
