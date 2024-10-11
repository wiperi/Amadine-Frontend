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
import Login from './pages/Login';
import AuthRoute from './pages/AuthRoute';
import EditableTable from './pages/EditableTable';
import AdvancedTable from './pages/AdvancedTable';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    element: (
      <AuthRoute>
        <DashBoard />
      </AuthRoute>
    ),
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
      },
    ]
  },
  {
    path: 'login',
    element: <Login />,
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
        path: 'et',
        element: <EditableTable />,
      },
      {
        path: 'at',
        element: <AdvancedTable />,
      }
    ]
  }
])