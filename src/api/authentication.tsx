import axios from 'axios';

interface User {
    username: string;
    password: string;
}

export async function registerUser({ username, password }: User) {
    const url = '/public/users/register';

    const content = 'username=' + username + '&password=' + password;
    const result = await axios.post<string>(url, content, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    return result;
}
