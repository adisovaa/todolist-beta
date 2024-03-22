import {TasksStateType} from "../App";
import {addTaskAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be delete from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "TS", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true},
            {id: '3', title: "Tea", isDone: false}
        ]
    }

    const action = removeTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
    expect(endState['todolistId2'][0].id).toBe('1')
})

test('correct task should be added to correct way', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "TS", isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: "Milk", isDone: true},
            {id: '2', title: "React Book", isDone: true},
            {id: '3', title: "Tea", isDone: false}
        ]
    }

    const action = addTaskAC('juice', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].isDone).toBe(false)
})