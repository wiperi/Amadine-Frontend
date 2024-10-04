import { App } from './App';
import { Navigation } from './pages/Navigation';
import { Comment } from './pages/Comment';
import { Counter } from './pages/Counter';
import { MainPage } from './pages/MainPage';

export const routes = [
    {
        path: '/',
        element: <Navigation />
    },
    {
        path: '/comment',
        element: <Comment />,
    },
    {
        path: '/counter',
        element: <Counter />,
    },
    {
        path: '/app',
        element: <App />,
    },
    {
        path: '/main',
        element: <MainPage />
    },
]