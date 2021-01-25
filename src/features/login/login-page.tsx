import React from 'react';
import Login from './login';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: '20vh 0 20vh 0',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const LoginPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                <Login />
            </Paper>
        </div>
    );
};

export default LoginPage;
