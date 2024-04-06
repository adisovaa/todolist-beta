import React from "react";
import {AddItemForm} from "./AddItemForm";
import {action} from '@storybook/addon-actions';
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
    decorators: [ReduxStoreProviderDecorator]
}

const callBack = action('Button ADD was pressed inside the form')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callBack}/>
}

