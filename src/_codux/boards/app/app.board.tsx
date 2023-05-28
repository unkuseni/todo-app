import { createBoard } from '@wixc3/react-board';
import App from '../../../App';
import Todo_module from '../../../components/todo/todo.module.scss';
import Classnames from 'classnames';

export default createBoard({
    name: 'App',
    Board: () => <App />,
    environmentProps: {
        windowWidth: 1920,
        windowHeight: 1080,
        canvasWidth: 1254,
        canvasHeight: 676,
    },
});
