import { App } from './App';
import { Comment } from './pages/Comment';
import { Counter } from './pages/Counter';

export const routes = [
    {
        path: '/',
        component: App
    },
    {
        path: '/comment',
        component: Comment,
    },
    {
        path: '/counter',
        component: Counter,
    }
]