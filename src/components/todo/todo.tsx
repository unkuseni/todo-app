import classNames from 'classnames';
import styles from './todo.module.scss';
import React, { useState } from 'react';

interface Todo {
    className?: string;
    id: number;
    text: string;
    completed: boolean;
}

const Todo: React.FC<Todo> = ({ className, id, text, completed }) => {
    return (
        <div className={classNames(styles.todo, className)}>
            </div>
    );
}

export default TodoList;
