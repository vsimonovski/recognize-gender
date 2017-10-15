import React, { Component } from 'react';
import { render } from 'react-dom';
import 'normalize.css';
import '../scss/index.scss';

import Form from './components/Form.index';

export default class App extends Component {
    render() {
        return <Form />;
    }
}

render(<App />, document.getElementById('app'));
