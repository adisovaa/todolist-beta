import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./state/store";
import AppWithRedux from "./AppWithRedux/AppWithRedux";


const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
);

serviceWorker.unregister();