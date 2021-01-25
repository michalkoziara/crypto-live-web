import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link, useLocation } from 'react-router-dom';

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
    const classes = useStyles();

    const location: string = useLocation().pathname;

    let title = '';
    let content: JSX.Element | null;

    if (location == '/login') {
        title = 'Logowanie';
        content = (
            <Button color="inherit" component={Link} to="/signup">
                Zarejestruj się
            </Button>
        );
    } else if (location == '/signup') {
        title = 'Rejestracja';
        content = (
            <Button color="inherit" component={Link} to="/login">
                Zaloguj się
            </Button>
        );
    } else {
        title = 'Panel główny';
        content = null;
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
