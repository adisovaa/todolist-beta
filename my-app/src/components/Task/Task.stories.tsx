import React from "react";
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

export default {
    title: 'AddItemForm Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const TaskBaseExample = (props: any) => {
    return <Task task={{id: '1', isDone: true, title: 'css'}}/>
}