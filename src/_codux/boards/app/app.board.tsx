import { createBoard } from '@wixc3/react-board';
import App from '../../../App';
import Todo_module from '../../../components/todo/todo.module.scss';
import Classnames from 'classnames';

export default createBoard({
    name: 'App',
    Board: () => <App />,
    environmentProps: {
        windowWidth: 876,
        windowHeight: 667,
        canvasWidth: 490,
        canvasHeight: 676,
    },
});
