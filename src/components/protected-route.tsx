import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { useCookies } from 'react-cookie';

export interface ProtectedRouteProps extends RouteProps {
    isAllowed: boolean;
    restrictedPath: string;
    authenticationPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    const [cookies, ,] = useCookies(['token']);

    let redirectPath = '';
    if (!!cookies.token) {
        redirectPath = props.authenticationPath;
    }
    if (!!cookies.token && !props.isAllowed) {
        redirectPath = props.restrictedPath;
    }

    if (redirectPath) {
        const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
        return <Route {...props} component={renderComponent} render={undefined} />;
    } else {
        return <Route {...props} />;
    }
};

export default ProtectedRoute;
