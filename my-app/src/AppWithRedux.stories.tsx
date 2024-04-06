import React from "react";
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxStories = (props: any) => {
    return <AppWithRedux/>
}

