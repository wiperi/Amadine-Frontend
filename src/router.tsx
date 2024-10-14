import TodoList from './pages/testPages/TodoList';
import { Navigation } from './pages/testPages/Navigation';
import DashBoard from './pages/DashBoard';
import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import AuthRoute from './pages/AuthRoute';

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
    ]
  }
])