import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CryptoList from '../../components/crypto-list';
import CryptoChart from '../../components/crypto-chart';
import { Autocomplete } from '@material-ui/lab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '95%',
        width: '95%',
        paddingTop: '5vh',
    },
    paper: {
        padding: theme.spacing(1),
    },
    container: {
        height: '90vh',
    },
    innerContainer: {
        height: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

const DashboardPage: React.FC = () => {
    const classes = useStyles();

    const inputValues = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
    ];

    const [time, setTime] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTime(event.target.value as string);
    };

    return (
        <div className={classes.root}>
            <Grid spacing={4} className={classes.container} container>
                <Grid item>
                    <Grid spacing={3} direction="column" className={classes.container} container>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Okres czasu</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={time}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'minutes'}>Minutowy</MenuItem>
                                        <MenuItem value={'hours'}>Godzinowy</MenuItem>
                                        <MenuItem value={'days'}>Dniowy</MenuItem>
                                    </Select>
                                </FormControl>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <Autocomplete
                                    className={classes.formControl}
                                    id="combo-box-demo"
                                    options={inputValues}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Sprzedawana waluta" variant="outlined" />
                                    )}
                                />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <Autocomplete
                                    className={classes.formControl}
                                    id="combo-box-demo"
                                    options={inputValues}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Kupowana waluta" variant="outlined" />
                                    )}
                                />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <h2 style={{ textAlign: 'center' }}>Ulubione</h2>
                                <CryptoList />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={8} item>
                    <Paper className={classes.paper}>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ marginBottom: 10 }}
                            startIcon={<StarIcon aria-label="favorite" style={{ color: 'yellow' }} />}
                        >
                            Dodaj do ulubionych
                        </Button>
                        <CryptoChart />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;
