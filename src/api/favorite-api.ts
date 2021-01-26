import axios, { AxiosResponse } from 'axios';
import './header-interceptor';
import { Favorite } from './favorite';

const getFavorites = async (): Promise<AxiosResponse> => {
    return await axios.get<Favorite>('/favorites');
};

const saveFavorite = async (favorite: Favorite): Promise<AxiosResponse> => {
    return await axios.post<Favorite>('/favorites', favorite, {
        headers: { 'Content-Type': 'application/json' },
    });
};

const updateFavorite = async (favorite: Favorite): Promise<AxiosResponse> => {
    return await axios.put<Favorite>('/favorites', favorite, {
        headers: { 'Content-Type': 'application/json' },
    });
};

const deleteFavorite = async (favorite: Favorite): Promise<AxiosResponse> => {
    return await axios.delete<Favorite>('/favorites', {
        data: favorite,
        headers: { 'Content-Type': 'application/json' },
    });
};

export { getFavorites, saveFavorite, updateFavorite, deleteFavorite };
