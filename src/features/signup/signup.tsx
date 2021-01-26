import React, { useState } from 'react';
import { Grid, TextField, Button, makeStyles, createStyles } from '@material-ui/core';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { registerUser } from '../../api/authentication';
import { useIntl, defineMessages } from 'react-intl';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

/// Default translations.
const translations = defineMessages({
    signUpTitle: 'Sign Up',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    confirmPasswordLabel: 'Confirm a password',
    registrationButtonLabel: 'Sign Up',
    usernameHelperText: 'Enter a username',
    usernameValidationError: 'Please enter a username!',
    passwordHelperText:
        'Acceptable passwords are at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character and no spaces.',
    passwordValidationError:
        'Please enter a valid password. Acceptable passwords are at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character and no spaces!',
    confirmPasswordHelperText: 'Re-enter password to confirm',
    confirmPasswordValidationError: 'Passwords must match!',
    confirmPasswordRequiredError: 'This field is required!',
    statusSuccess: 'Signed up successfully',
    statusError: 'Something went wrong. Please try again.',
});

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: '500px',
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

interface ISignUpForm {
    username: string;
    password: string;
    confirmPassword: string;
}

interface IFormStatus {
    message: string;
    type: 'success' | 'error';
}

interface IFormStatusProps {
    [key: string]: IFormStatus;
}

const SignUp: React.FunctionComponent = () => {
    const intl = useIntl();
    const classes = useStyles();
    const history = useHistory();
    const [, setCookie] = useCookies(['token']);

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

    const signUpUser = async (data: ISignUpForm) => {
        registerUser({ username: data.username, password: data.password })
            .then((value) => {
                setCookie('token', value.data, { path: '/', sameSite: 'strict', maxAge: 10 * 60 });
                setFormStatus(formStatusProps.success);
                history.push('/');
            })
            .catch(() => setFormStatus(formStatusProps.error))
            .finally(() => setOpen(true));
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
                    confirmPassword: '',
                }}
                onSubmit={(values: ISignUpForm, actions) => {
                    signUpUser(values).then(() => {
                        actions.resetForm({});
                    });
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required(intl.formatMessage(translations.usernameValidationError)),
                    password: Yup.string()
                        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/, {
                            message: intl.formatMessage(translations.passwordHelperText),
                        })
                        .required(intl.formatMessage(translations.passwordValidationError)),
                    confirmPassword: Yup.string()
                        .required(intl.formatMessage(translations.confirmPasswordRequiredError))
                        .test(
                            'password-match',
                            intl.formatMessage(translations.confirmPasswordValidationError),
                            function (value) {
                                return this.parent.password === value;
                            },
                        ),
                })}
            >
                {(props: FormikProps<ISignUpForm>) => {
                    const { values, touched, errors, handleBlur, handleChange } = props;
                    return (
                        <Form>
                            <h1 className={classes.title}>{intl.formatMessage(translations.signUpTitle)}</h1>
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
                                                ? errors.password
                                                : intl.formatMessage(translations.passwordHelperText)
                                        }
                                        error={!!(errors.password && touched.password)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.textField}>
                                    <TextField
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        label={intl.formatMessage(translations.confirmPasswordLabel)}
                                        value={values.confirmPassword}
                                        type="password"
                                        helperText={
                                            errors.confirmPassword && touched.confirmPassword
                                                ? errors.confirmPassword
                                                : intl.formatMessage(translations.confirmPasswordHelperText)
                                        }
                                        error={!!(errors.confirmPassword && touched.confirmPassword)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.submitButton}>
                                    <Button type="submit" variant="contained" color="secondary">
                                        {intl.formatMessage(translations.registrationButtonLabel)}
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

export default SignUp;
