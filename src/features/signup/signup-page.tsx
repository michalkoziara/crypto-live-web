import React from 'react';
import SignUp from './signup';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const SignUpPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div>
            <Paper className={classes.paper}>
                <SignUp />
            </Paper>
        </div>
    );
};

export default SignUpPage;
