import { createBoard } from '@wixc3/react-board';
import App from '../../../App';
import Todo_module from '../../../components/todo/todo.module.scss';

export default createBoard({
    name: 'App',
    Board: () => <App className={Todo_module.root} />,
    environmentProps: {
        windowWidth: 375,
    },
});
