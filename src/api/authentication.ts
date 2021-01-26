import axios, { AxiosResponse } from 'axios';
import './header-interceptor';

interface User {
    username: string;
    password: string;
}

const registerUser = async ({ username, password }: User): Promise<AxiosResponse> => {
    const url = '/public/users/register';

    const content = 'username=' + username + '&password=' + password;
    return await axios.post<string>(url, content, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
};

const loginUser = async ({ username, password }: User): Promise<AxiosResponse> => {
    const url = '/public/users/login';

    const content = 'username=' + username + '&password=' + password;
    return await axios.post<string>(url, content, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
};

const logoutUser = async (): Promise<AxiosResponse> => {
    const url = '/users/logout';

    return await axios.get(url);
};

export { registerUser, loginUser, logoutUser };
