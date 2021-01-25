import axios, { AxiosResponse } from 'axios';

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

export { registerUser, loginUser };
