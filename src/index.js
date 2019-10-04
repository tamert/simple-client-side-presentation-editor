import ReactDOM from 'react-dom';
import React from 'react';
import {Provider} from 'react-redux';
import './assets/sass/app.scss';
import App from './components/App';
import {store} from "./Store";
import $ from "jquery";


class Index extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}

export default Index;

if (document.getElementById('root')) {
    ReactDOM.render(<Index />, document.getElementById('root'));
}

