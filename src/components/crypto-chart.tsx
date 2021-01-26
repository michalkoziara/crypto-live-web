import Chart from 'react-apexcharts';
import React from 'react';
import { language } from '../translations';
import pl from '../translations/charts/pl.json';
import en from '../translations/charts/en.json';
import { Price } from '../api/price';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    label: {
        display: 'flex',
        margin: 'auto',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const CryptoChart: React.FC<{ data: Price[] }> = (props) => {
    const classes = useStyles();

    const series = [
        {
            data: props.data.map((price) => {
                return { x: new Date(price.time * 1000), y: [price.open, price.high, price.low, price.close] };
            }),
        },
    ];

    const options = {
        chart: {
            defaultLocale: language,
            locales: [pl, en],
            type: 'candlestick',
            animations: {
                enabled: false,
            },
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };

    if (props.data.length == 0) {
        return (
            <div className={classes.label}>
                <h2>No available data!</h2>
            </div>
        );
    }

    return <Chart options={options} series={series} type="candlestick" />;
};

CryptoChart.propTypes = {
    data: PropTypes.any.isRequired,
};

export default CryptoChart;
