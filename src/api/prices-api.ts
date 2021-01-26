import axios, { AxiosResponse } from 'axios';
import { Price } from './price';
import './header-interceptor';

const getMinutePrices = async (coinFromSymbol: string, coinToSymbol: string, limit: number): Promise<AxiosResponse> => {
    return await axios.get<Price>('/prices/minute', {
        params: {
            coinFromSymbol: String(coinFromSymbol),
            coinToSymbol: String(coinToSymbol),
            limit: Number(limit),
        },
    });
};

const getHourlyPrices = async (coinFromSymbol: string, coinToSymbol: string, limit: number): Promise<AxiosResponse> => {
    return await axios.get<Price>('/prices/hourly', {
        params: {
            coinFromSymbol: String(coinFromSymbol),
            coinToSymbol: String(coinToSymbol),
            limit: Number(limit),
        },
    });
};

const getDailyPrices = async (coinFromSymbol: string, coinToSymbol: string, limit: number): Promise<AxiosResponse> => {
    return await axios.get<Price>('/prices/daily', {
        params: {
            coinFromSymbol: String(coinFromSymbol),
            coinToSymbol: String(coinToSymbol),
            limit: Number(limit),
        },
    });
};

export { getMinutePrices, getHourlyPrices, getDailyPrices };
