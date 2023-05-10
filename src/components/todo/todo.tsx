import classNames from 'classnames';
import styles from './todo.module.scss';
import React, { useState, useCallback, useMemo, FormEvent, useReducer, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ThemeContext } from '../Theme/ThemeProvider';
import iconCross from '../../assets/icon-cross.svg';
import iconCheck from '../../assets/icon-check.svg';

enum Filter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}

interface Task {
    text: string;
    completed: boolean;
}

interface TodoProps {
    className?: string;
}
type TaskAction =
    | { type: 'add'; task: Task }
    | { type: 'complete'; index: number }
    | { type: 'delete'; index: number }
    | { type: 'clearCompleted' }
    | { type: 'reorder'; sourceIndex: number; destIndex: number };
function tasksReducer(state: Task[], action: TaskAction) {
    switch (action.type) {
        case 'add':
            return [...state, action.task];
        case 'complete':
            return state.map((task, index) =>
                index === action.index ? { ...task, completed: !task.completed } : task
            );
        case 'delete':
            return state.filter((_, index) => index !== action.index);
        case 'clearCompleted':
            return state.filter((task) => !task.completed);
        case 'reorder':
            const { sourceIndex, destIndex } = action;
            const newTasks = [...state];
            const [removed] = newTasks.splice(sourceIndex, 1);
            newTasks.splice(destIndex, 0, removed);
            return newTasks;
        default:
            return state;
    }
}

export const Todo: React.FC<TodoProps> = ({ className }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const theme = useContext(ThemeContext);
    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (inputValue) {
                dispatch({ type: 'add', task: { text: inputValue, completed: false } });
            }
            setInputValue('');
        },
        [inputValue]
    );

    const handleComplete = useCallback((index: number) => {
        dispatch({ type: 'complete', index });
    }, []);

    const handleDelete = useCallback((index: number) => {
        dispatch({ type: 'delete', index });
    }, []);

    const handleClearCompleted = useCallback(() => {
        dispatch({ type: 'clearCompleted' });
    }, []);

    const filteredTasks = useMemo(() => {
        switch (filter) {
            case Filter.Active:
                return tasks.filter((task) => !task.completed);
            case Filter.Completed:
                return tasks.filter((task) => task.completed);
            default:
                return tasks;
        }
    }, [tasks, filter]);
// task items
    const taskItems = useMemo(
        () =>
            filteredTasks.map((task, index) => (
                <Draggable key={task.text} draggableId={task.text} index={index}>
                    {(provided) => (
                        <li
                            key={task.text}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={styles.item}
                        >
                            <label {...provided.dragHandleProps}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleComplete(index)}
                                />
                                <span className={task.completed ? 'completed' : ''}>
                                    {task.text}
                                </span>
                            </label>
                            <button onClick={() => handleDelete(index)}>
                                <img src={iconCross} alt="Delete" />
                            </button>
                        </li>
                    )}
                </Draggable>
            )),
        [filteredTasks, handleComplete, handleDelete]
    );

    const onDragEnd = useCallback((result) => {
        if (!result.destination) {
            return;
        }

        dispatch({
            type: 'reorder',
            sourceIndex: result.source.index,
            destIndex: result.destination.index,
        });
    }, []);

    const remainingItems = useMemo(
        () => filteredTasks.filter((task) => !task.completed).length,
        [filteredTasks]
    );
    return (
        <div className={classNames(styles.root, className)}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="todo" className={styles['form-label']}>
                    {/* Add an icon checkmark when task is completed */}
                </label>
                <input
                    type="text"
                    id="todo"
                    placeholder="Add a new task"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={styles['form-input']}
                />
            </form>
            <div className={styles['list-items']}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="tasks">
                        {(provided) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {taskItems}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div>
                <button
                    className={classNames({ active: filter === Filter.All })}
                    onClick={() => setFilter(Filter.All)}
                >
                    All
                </button>
                <button
                    className={classNames({ active: filter === Filter.Active })}
                    onClick={() => setFilter(Filter.Active)}
                >
                    Active
                </button>
                <button
                    className={classNames({ active: filter === Filter.Completed })}
                    onClick={() => setFilter(Filter.Completed)}
                >
                    Completed
                </button>
            </div>
            <div>
                <span>{remainingItems} items left</span>
                <button onClick={handleClearCompleted}>Clear completed</button>
            </div>
            <style jsx>{`
                .completed {
                    text-decoration: line-through;
                }

                .active {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};
