import { createBoard } from '@wixc3/react-board';
import { Todo } from '../../../components/todo/todo';

export default createBoard({
    name: 'Todo',
    Board: () => <Todo />,
    environmentProps: {
        windowWidth: 375,
        windowHeight: 667,
        canvasWidth: 259,
        canvasHeight: 170,
    },
});
