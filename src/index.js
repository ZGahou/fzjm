import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './router';
import './css/lib';
import {Provider} from 'react-redux';
import store from './store'

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Component/>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};
render(App);

// 模块热替换的 API
if (module.hot) {
    module.hot.accept('./router', () => {
        render(App)
    });
}