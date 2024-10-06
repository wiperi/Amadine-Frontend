import TodoList from './pages/TodoList';
import { Navigation } from './pages/Navigation';
import { Comment } from './pages/Comment';
import { Counter } from './pages/Counter';
import DashBoard from './pages/DashBoard';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import App from './pages/App';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: <DashBoard />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
      {
        path: 'profile',
        element: <Profile />,
      }
    ]
  },
  {
    path: '/nav',
    errorElement: <NotFound />,
    element: <Navigation />,
    children: [
      {
        path: 'todoList',
        element: <TodoList />,
      },
      {
        path: 'counter',
        element: <Counter />,
      },
      {
        path: 'comment',
        element: <Comment />,
      },
      {
        path: 'app',
        element: <App />,
      }
    ]
  }
])