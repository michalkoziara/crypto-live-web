import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import './App.css';
import SignUpPage from '../features/signup/signup-page';
import LoginPage from '../features/login/login-page';
import DashboardPage from '../features/dashboard/dashboard-page';
import ProtectedRoute from '../components/protected-route';
import PageBar from '../components/page-bar';
import LogoutPage from '../features/logout/logout-page';

const App: React.FC = () => {
    const defaultProtectedRouteProps = {
        isAllowed: true,
        restrictedPath: '/login',
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
                            <Route path="/logout">
                                <LogoutPage />
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
