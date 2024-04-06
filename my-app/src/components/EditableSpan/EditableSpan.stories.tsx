import React from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

export default {
    title: 'EditableSpan Component',
    component: EditableSpan,
    decorators: [ReduxStoreProviderDecorator]
}

const changeCallback = action('Value changed')

export const EditableSpanStories = (props: any) => {
    return <EditableSpan title={'hey'} onChange={changeCallback} key={props.id}/>
}

