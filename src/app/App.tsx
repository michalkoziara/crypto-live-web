import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUpPage from '../features/signup/signup-page';
import LoginPage from '../features/login/login-page';
import DashboardPage from '../features/dashboard/dashboard-page';
import ProtectedRoute, { ProtectedRouteProps } from '../components/protected-route';

import './App.css';
import PageBar from '../components/page-bar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const App: React.FC = () => {
    const defaultProtectedRouteProps: ProtectedRouteProps = {
        isAllowed: true,
        restrictedPath: '/login',
        isAuthenticated: document.cookie.length > 0,
        authenticationPath: '/login',
    };

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#1d36ba',
            },
            secondary: blue,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Router>
                    <PageBar />
                    <div className="App">
                        <Switch>
                            <Route path="/signup">
                                <SignUpPage />
                            </Route>
                            <Route path="/login">
                                <LoginPage />
                            </Route>
                            <ProtectedRoute
                                {...defaultProtectedRouteProps}
                                exact={true}
                                path="/"
                                component={DashboardPage}
                            />
                            <ProtectedRoute
                                {...defaultProtectedRouteProps}
                                exact={true}
                                path="*"
                                component={DashboardPage}
                            />
                        </Switch>
                    </div>
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default App;
