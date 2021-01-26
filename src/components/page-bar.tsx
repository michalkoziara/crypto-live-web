import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';

const translations = defineMessages({
    loginTitle: 'Login',
    registrationButtonLabel: 'Sign Up',
    registrationTitle: 'Registration',
    loginButtonLabel: 'Sign In',
    dashboardTitle: 'Dashboard',
    logoutButtonLabel: 'Log out',
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const PageBar: React.FC = () => {
    const intl = useIntl();
    const classes = useStyles();

    const location: string = useLocation().pathname;

    let title = '';
    let content: JSX.Element | null;

    if (location == '/login') {
        title = intl.formatMessage(translations.loginTitle);
        content = (
            <Button color="inherit" component={Link} to="/signup">
                {intl.formatMessage(translations.registrationButtonLabel)}
            </Button>
        );
    } else if (location == '/signup') {
        title = intl.formatMessage(translations.registrationTitle);
        content = (
            <Button color="inherit" component={Link} to="/login">
                {intl.formatMessage(translations.loginButtonLabel)}
            </Button>
        );
    } else {
        title = intl.formatMessage(translations.dashboardTitle);
        content = null;

        content = (
            <Button color="inherit" component={Link} to="/logout">
                {intl.formatMessage(translations.logoutButtonLabel)}
            </Button>
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    {content}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default PageBar;
