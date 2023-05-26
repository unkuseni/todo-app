import { createBoard } from '@wixc3/react-board';
import App from '../../../App';
import Todo_module from '../../../components/todo/todo.module.scss';
import Classnames from 'classnames';

export default createBoard({
    name: 'App',
    Board: () => <App />,
    environmentProps: {
        windowWidth: 768,
        windowHeight: 1024,
        canvasWidth: 490,
        canvasHeight: 676,
    },
});
