import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';
import translations, { language } from './translations';

ReactDOM.render(
    <React.StrictMode>
        <IntlProvider locale={language} messages={translations[language]}>
            <App />
        </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
