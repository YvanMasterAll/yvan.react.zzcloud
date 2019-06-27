import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Root from './controls/root'
import './index.css';
import {store} from './redux/configure';
import Prime from './prime/prime.js';

ReactDOM.render(
	<Root store={store} />,
	//<Prime />,
	document.getElementById("root")
)

registerServiceWorker();