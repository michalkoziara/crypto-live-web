import React, { useState } from 'react';
import { Grid, TextField, Button, makeStyles, createStyles } from '@material-ui/core';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useIntl, defineMessages } from 'react-intl';

/// Default translations.
const translations = defineMessages({
    loginTitle: 'Sign In',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    loginButtonLabel: 'Sign in',
    usernameHelperText: 'Enter a username',
    usernameValidationError: 'Please enter a username!',
    passwordHelperText: 'Enter a password',
    passwordRequiredError: 'Please enter a password!',
    passwordValidationError: 'Please enter valid password!',
    statusSuccess: 'Logged in successfully',
    statusError: 'Something went wrong. Please try again.',
});

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: '450px',
            display: 'block',
            margin: '10 auto',
        },
        textField: {
            '& > *': {
                width: '100%',
            },
        },
        submitButton: {
            marginTop: '24px',
        },
        title: { textAlign: 'center', color: 'rgb(37,60,184)' },
        snackbar: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

interface ILoginForm {
    username: string;
    password: string;
}

interface IFormStatus {
    message: string;
    type: 'success' | 'error';
}

interface IFormStatusProps {
    [key: string]: IFormStatus;
}

const Login: React.FunctionComponent = () => {
    const intl = useIntl();
    const classes = useStyles();

    const formStatusProps: IFormStatusProps = {
        success: {
            message: intl.formatMessage(translations.statusSuccess),
            type: 'success',
        },
        error: {
            message: intl.formatMessage(translations.statusError),
            type: 'error',
        },
    };

    const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: 'success',
    });
    const [open, setOpen] = useState(false);

    const handleClose = (_?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const createNewUser = async (data: ILoginForm) => {
        try {
            if (data) {
                setFormStatus(formStatusProps.success);
            }
        } catch (error) {
            const response = error.response;
            if (response.status !== 200) {
                setFormStatus(formStatusProps.error);
            }
        } finally {
            setOpen(true);
        }
    };

    return (
        <div className={classes.root}>
            <div className={classes.snackbar}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={formStatus.type}>
                        {formStatus.message}
                    </Alert>
                </Snackbar>
            </div>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={(values: ILoginForm, actions) => {
                    createNewUser(values).then(() => actions.resetForm({}));
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 500);
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required(intl.formatMessage(translations.usernameValidationError)),
                    password: Yup.string().required(intl.formatMessage(translations.passwordRequiredError)),
                })}
            >
                {(props: FormikProps<ILoginForm>) => {
                    const { values, touched, errors, handleBlur, handleChange, isSubmitting } = props;
                    return (
                        <Form>
                            <h1 className={classes.title}>{intl.formatMessage(translations.loginTitle)}</h1>
                            <Grid container justify="space-around" direction="row">
                                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                                    <TextField
                                        name="username"
                                        id="username"
                                        label={intl.formatMessage(translations.usernameLabel)}
                                        value={values.username}
                                        type="text"
                                        helperText={
                                            errors.username && touched.username
                                                ? errors.username
                                                : intl.formatMessage(translations.usernameHelperText)
                                        }
                                        error={!!(errors.username && touched.username)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                                    <TextField
                                        name="password"
                                        id="password"
                                        label={intl.formatMessage(translations.passwordLabel)}
                                        value={values.password}
                                        type="password"
                                        helperText={
                                            errors.password && touched.password
                                                ? intl.formatMessage(translations.passwordValidationError)
                                                : intl.formatMessage(translations.passwordHelperText)
                                        }
                                        error={!!(errors.password && touched.password)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.submitButton}>
                                    <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                                        {intl.formatMessage(translations.loginButtonLabel)}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default Login;
