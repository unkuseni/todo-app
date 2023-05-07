import { createBoard } from '@wixc3/react-board';
import { Todo } from '../../../components/todo/todo';

export default createBoard({
    name: 'Todo',
    Board: () => <Todo />
});
