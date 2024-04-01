// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BrickBreaker from './BrickBreaker';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrickBreaker />, document.getElementById('root'));

serviceWorker.unregister();