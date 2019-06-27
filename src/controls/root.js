import React from 'react';
import {Provider} from 'react-redux';
import App from './app';
import DevTools from '../redux/devtools/devtools';

export const Root = ({store}) => {
    return (
        <Provider store={store}>
            <div>
                <App />
                <DevTools />
            </div>
        </Provider>
    )
}

export default Root