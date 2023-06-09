import classNames from 'classnames';
import styles from './todo.module.scss';
import React, { useState, useCallback, useMemo, FormEvent, useReducer, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import iconCross from '../../assets/icon-cross.svg';

enum Filter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}

interface Task {
    text: string;
    completed: boolean;
    id: number;
}

interface TodoProps {
    className?: string;
    theme: 'light' | 'dark';
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
            const newTask: Task = {
                id: Date.now(),
                text: action.task.text,
                completed: false,
            };
            return [...state, newTask];
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
            const [removed] = newTasks.splice(Number(sourceIndex), 1);
            newTasks.splice(Number(destIndex), 0, removed);
            return newTasks;
        default:
            return state;
    }
}

export const Todo: React.FC<TodoProps> = ({ className, theme }) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [tasks, dispatch] = useReducer(tasksReducer, []);
    const [filter, setFilter] = useState<Filter>(Filter.All);
    const [isMobile, setIsMobile] = useState<boolean>(
        window.matchMedia('(max-width: 634px)').matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 634px)');
        const handleResize = () => setIsMobile(mediaQuery.matches);
        mediaQuery.addEventListener('change',handleResize);
        return () => mediaQuery.removeEventListener('change',handleResize);
    }, []);
    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (inputValue) {
                dispatch({
                    type: 'add',
                    task: { text: inputValue, id: Date.now(), completed: false },
                });
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
            /* This code block is defining a `useMemo` hook that filters the `tasks` array based on the
      `filter` state. The `filter` state is an enum with three possible values: `All`, `Active`, and
      `Completed`. */
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
                <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                    {(provided: any) => (
                        <li
                            key={task.id.toString()}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={classNames(styles.item)}
                        >
                            <label {...provided.dragHandleProps}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleComplete(index)}
                                />
                                <span className={task.completed ? styles.completed : ''}>
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

    const onDragEnd = useCallback((result: any) => {
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
        <div className={classNames(styles.root)}>
            <form
                onSubmit={handleSubmit}
                className={classNames(styles.form, theme === 'dark' && styles.dark)}
            >
                <label htmlFor="todo" className={styles['form-label']}>
                    {/* Add an icon checkmark when task is completed */}
                </label>
                <input
                    type="text"
                    id="todo"
                    placeholder="Create a new todo..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={styles['form-input']}
                />
            </form>
            <div className={classNames(styles['list-items'], theme === 'dark' && styles.dark)}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={`${tasks}`}>
                        {(provided: any) => (
                            <ul {...provided.droppableProps} ref={provided.innerRef}>
                                {taskItems}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className={classNames(styles.tracker, theme === 'dark' && styles.dark)}>
                    <span>{remainingItems} items left</span>
                    {!isMobile && (
                        <div
                            className={classNames(styles.filters, theme === 'dark' && styles.dark)}
                        >
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
                    )}
                    <button onClick={handleClearCompleted} type="button">
                        Clear completed
                    </button>
                </div>
            </div>
            {isMobile && (
                <div className={classNames(styles.filters, theme === 'dark' && styles.dark)}>
                    <button
                        name="filter"
                        className={classNames({ active: filter === Filter.All })}
                        onClick={() => setFilter(Filter.All)}
                    >
                        All
                    </button>
                    <button
                        name="filter"
                        className={classNames({ active: filter === Filter.Active })}
                        onClick={() => setFilter(Filter.Active)}
                    >
                        Active
                    </button>
                    <button name='filter'
                        className={classNames({ active: filter === Filter.Completed })}
                        onClick={() => setFilter(Filter.Completed)}
                    >
                        Completed
                    </button>
                </div>
            )}
        </div>
    );
};
