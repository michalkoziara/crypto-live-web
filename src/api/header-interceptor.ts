import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

axios.interceptors.request.use((req) => {
    const token = cookies.get('token');
    if (token != null) {
        req.headers.authorization = 'Bearer ' + token;
    }

    return req;
});
