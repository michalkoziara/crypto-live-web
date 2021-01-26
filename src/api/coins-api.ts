import axios, { AxiosResponse } from 'axios';
import { Coin } from './coin';
import './header-interceptor';

const getCoins = async (): Promise<AxiosResponse> => {
    return await axios.get<Coin>('/coins');
};

export { getCoins };
