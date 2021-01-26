import React, { useEffect } from 'react';
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
import { getDailyPrices, getHourlyPrices, getMinutePrices } from '../../api/prices-api';
import { Price } from '../../api/price';
import { Modal, Slider, TextareaAutosize, Typography } from '@material-ui/core';
import { getFavorites, saveFavorite } from '../../api/favorite-api';
import { Favorite } from '../../api/favorite';

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
    formControl: {
        margin: theme.spacing(1),
        paddingBottom: '10px',
        minWidth: 300,
    },
    slider: {
        width: '90%',
        display: 'flex',
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        textAlign: 'center',
    },
    favoriteButton: {
        marginBottom: 10,
    },
    height: {
        height: '100%',
    },
    center: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '10px',
    },
    modal: {
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '0px solid #FFF',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const DashboardPage: React.FC = () => {
    const classes = useStyles();

    const defaultTimeTickValue = 30;

    const [time, setTime] = React.useState('');
    const [timeTick, setTimeTick] = React.useState(defaultTimeTickValue);
    const [coinFrom, setCoinFrom] = React.useState<Coin | null>(null);
    const [coinTo, setCoinTo] = React.useState<Coin | null>(null);
    const [coins, setCoins] = React.useState<Coin[]>([]);

    const [open, setOpen] = React.useState(false);
    const [favorite, setFavorite] = React.useState<Favorite | null>(null);

    const [favorites, setFavorites] = React.useState<Favorite[]>([]);
    const [prices, setPrices] = React.useState<Price[]>([]);
    const [isPriceUpdating, setIsPriceUpdating] = React.useState(false);

    const handleTimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTime(event.target.value as string);
    };

    const handleTimeTicksChange = (_event: unknown, newValue: unknown) => {
        setTimeTick(newValue as number);
    };

    const handleCoinFromSymbolChange = (_event: unknown, value: unknown) => {
        if (!!value) {
            setCoinFrom(value as { id: string; symbol: string });
        } else {
            setCoinFrom(null);
            setPrices([]);
        }
    };

    const handleCoinToSymbolChange = (_event: unknown, value: unknown) => {
        if (!!value) {
            setCoinTo(value as { id: string; symbol: string });
        } else {
            setCoinTo(null);
            setPrices([]);
        }
    };

    const handleWatchlistClick = (favorite: Favorite) => {
        const coinFromFavorite = coins.find((coin) => coin.symbol == favorite.coinFromSymbol);
        const coinToFavorite = coins.find((coin) => coin.symbol == favorite.coinToSymbol);

        if (!!coinFromFavorite) {
            setCoinFrom(coinFromFavorite);
        }

        if (!!coinToFavorite) {
            setCoinTo(coinToFavorite);
        }
    };

    const handleWatchlistChange = (favorites: Favorite[]) => {
        setFavorites(favorites);
    };

    const handleOpen = (favorite: Favorite) => {
        setOpen(true);
        setFavorite(favorite);
    };

    const handleClose = () => {
        setOpen(false);

        if (!!favorite) {
            saveFavorite({
                coinToSymbol: favorite.coinToSymbol,
                coinFromSymbol: favorite.coinFromSymbol,
                description: favorite.description,
            })
                .catch()
                .then(() =>
                    getFavorites()
                        .then((result) => {
                            setFavorites(result.data);
                        })
                        .catch(),
                );
        }

        setFavorite(null);
    };

    useEffect(() => {
        if (coins.length == 0) {
            getCoins()
                .then((result) => {
                    setCoins(result.data);
                })
                .catch();

            getFavorites()
                .then((result) => {
                    setFavorites(result.data);
                })
                .catch();
        }

        if (!isPriceUpdating && !!coinTo && !!coinFrom) {
            if (time == 'minutes') {
                setIsPriceUpdating(true);
                getMinutePrices(coinFrom.symbol, coinTo.symbol, timeTick)
                    .then((result) => {
                        setPrices(result.data);
                        setIsPriceUpdating(false);
                    })
                    .catch();
            } else if (time == 'hours') {
                setIsPriceUpdating(true);
                getHourlyPrices(coinFrom.symbol, coinTo.symbol, timeTick)
                    .then((result) => {
                        setPrices(result.data);
                        setIsPriceUpdating(false);
                    })
                    .catch();
            } else if (time == 'days') {
                setIsPriceUpdating(true);
                getDailyPrices(coinFrom.symbol, coinTo.symbol, timeTick)
                    .then((result) => {
                        setPrices(result.data);
                        setIsPriceUpdating(false);
                    })
                    .catch();
            }
        }
    });

    return (
        <div className={classes.root}>
            <Grid spacing={4} className={classes.container} container>
                <Grid item>
                    <Grid spacing={3} direction="column" className={classes.container} container>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <h3 className={classes.label}>Coins</h3>

                                <FormControl className={classes.formControl}>
                                    <InputLabel>Period of time</InputLabel>
                                    <Select value={time} onChange={handleTimeChange}>
                                        <MenuItem value={'minutes'}>Minutes</MenuItem>
                                        <MenuItem value={'hours'}>Hours</MenuItem>
                                        <MenuItem value={'days'}>Days</MenuItem>
                                    </Select>
                                </FormControl>

                                {time == '' ? null : (
                                    <div>
                                        <Typography className={classes.slider} gutterBottom>
                                            Number of {time}
                                        </Typography>
                                        <Slider
                                            className={classes.slider}
                                            defaultValue={30}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={10}
                                            marks
                                            min={10}
                                            max={100}
                                            onChange={handleTimeTicksChange}
                                        />
                                    </div>
                                )}

                                <Autocomplete
                                    className={classes.formControl}
                                    onChange={handleCoinFromSymbolChange}
                                    value={coinFrom}
                                    options={coins}
                                    getOptionLabel={(coin) => coin.symbol}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Currency that you sell" variant="outlined" />
                                    )}
                                />

                                <Autocomplete
                                    className={classes.formControl}
                                    onChange={handleCoinToSymbolChange}
                                    value={coinTo}
                                    options={coins}
                                    getOptionLabel={(coin) => coin.symbol}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Currency that you buy" variant="outlined" />
                                    )}
                                />
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.paper}>
                                <h3 className={classes.label}>Watchlist</h3>
                                <CryptoList
                                    data={favorites}
                                    callback={handleWatchlistClick}
                                    callbackOnChange={handleWatchlistChange}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={8} item>
                    <Paper className={`${classes.paper} ${classes.height}`}>
                        {prices.length == 0 ? null : (
                            <div>
                                <Button
                                    onClick={() => {
                                        if (!!coinTo && !!coinFrom) {
                                            const newFavorite = {
                                                coinToSymbol: coinTo?.symbol,
                                                coinFromSymbol: coinFrom?.symbol,
                                                description: '',
                                            };
                                            handleOpen(newFavorite);
                                        }
                                    }}
                                    variant="contained"
                                    color="secondary"
                                    className={classes.favoriteButton}
                                    startIcon={<StarIcon aria-label="favorite" style={{ color: 'yellow' }} />}
                                >
                                    Add to watchlist
                                </Button>
                            </div>
                        )}
                        <CryptoChart data={prices} />
                    </Paper>
                </Grid>
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <div className={classes.modal}>
                    <h3 className={classes.center}>Add description</h3>
                    <TextareaAutosize
                        className={classes.center}
                        rowsMax={4}
                        rowsMin={4}
                        onChange={(event) => {
                            const changedFavorite = favorite;

                            if (!!changedFavorite) {
                                changedFavorite.description = event.target.value as string;
                                setFavorite(changedFavorite);
                            }
                        }}
                        defaultValue={favorite?.description}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default DashboardPage;
