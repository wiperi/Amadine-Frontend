import { App } from './App';
import { Comment } from './pages/Comment';

export const routes = [
    {
        path: '/',
        component: App
    },
    {
        path: '/comment',
        component: Comment,
    }
]