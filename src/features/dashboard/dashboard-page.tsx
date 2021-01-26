import React, { useEffect, useRef } from 'react';
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
import { getCoins } from '../../api/coins-api';
import { Coin } from '../../api/coin';

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
        paddingBottom: '10px',
        minWidth: 300,
    },
    label: {
        textAlign: 'center',
    },
    favoriteButton: {
        marginBottom: 10,
    },
}));

const DashboardPage: React.FC = () => {
    const classes = useStyles();

    const [time, setTime] = React.useState('');
    const [coinFromSymbol, setCoinFromSymbol] = React.useState('');
    const [coinToSymbol, setCoinToSymbol] = React.useState('');
    const [coins, setCoins] = React.useState<Coin[]>([]);

    const isMountedRef = useRef(true);

    const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTime(event.target.value as string);
    };

    const handleCoinFromSymbolChange = (_event: unknown, value: unknown) => {
        if (!!value) {
            setCoinFromSymbol((value as { title: string; year: number }).title);
        }
    };

    const handleCoinToSymbolChange = (_event: unknown, value: unknown) => {
        if (!!value) {
            setCoinToSymbol((value as { title: string; year: number }).title);
        }
    };

    useEffect(() => {
        if (coins.length == 0) {
            getCoins().then((result) => {
                if (isMountedRef.current) {
                    setCoins(result.data);
                }
            });
        }

        return () => {
            isMountedRef.current = false;
        };
    });

    return (
        <div className={classes.root}>
            <Grid spacing={4} className={classes.container} container>
                <Grid item>
                    <Grid spacing={3} direction="column" className={classes.container} container>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <h3 className={classes.label}>Waluta</h3>

                                <FormControl className={classes.formControl}>
                                    <InputLabel>Okres czasu</InputLabel>
                                    <Select value={time} onChange={handleTimeChange}>
                                        <MenuItem value={'minutes'}>Minutowy</MenuItem>
                                        <MenuItem value={'hours'}>Godzinowy</MenuItem>
                                        <MenuItem value={'days'}>Dniowy</MenuItem>
                                    </Select>
                                </FormControl>

                                <Autocomplete
                                    className={classes.formControl}
                                    onChange={handleCoinFromSymbolChange}
                                    inputValue={coinFromSymbol}
                                    options={coins}
                                    getOptionLabel={(coin) => coin.symbol}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Sprzedawana waluta" variant="outlined" />
                                    )}
                                />

                                <Autocomplete
                                    className={classes.formControl}
                                    onChange={handleCoinToSymbolChange}
                                    inputValue={coinToSymbol}
                                    options={coins}
                                    getOptionLabel={(coin) => coin.symbol}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Kupowana waluta" variant="outlined" />
                                    )}
                                />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <h3 className={classes.label}>Lista obserwowanych</h3>
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
                            className={classes.favoriteButton}
                            startIcon={<StarIcon aria-label="favorite" style={{ color: 'yellow' }} />}
                        >
                            Dodaj do obserwowanych
                        </Button>
                        <CryptoChart />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default DashboardPage;
