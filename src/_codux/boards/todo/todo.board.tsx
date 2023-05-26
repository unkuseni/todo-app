import { createBoard } from '@wixc3/react-board';
import { Todo } from '../../../components/todo/todo';

export default createBoard({
    name: 'Todo',
    Board: () => <Todo theme="dark" />,
    environmentProps: {
        windowWidth: 1508,
        windowHeight: 1368,
        canvasWidth: 259,
        canvasHeight: 164,
    },
});
