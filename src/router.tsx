import TodoList from './pages/testPages/TodoList';
import { Navigation } from './pages/testPages/Navigation';
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const PlayerLobby = lazy(() => import('./pages/QuizSession/PlayerLobby'));
const PlayerJoin = lazy(() => import('./pages/QuizSession/PlayerJoin'));
const AdminLobby = lazy(() => import('./pages/QuizSession/AdminLobby'));
const DashBoard = lazy(() => import('./pages/DashBoard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const AuthRoute = lazy(() => import('./pages/AuthRoute'));
const Quiz = lazy(() => import('./pages/Quiz'));
const TrashBin = lazy(() => import('./pages/TrashBin'));
const Help = lazy(() => import('./pages/Help'));

function suspenseWrapper(component: React.ReactNode) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {component}
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: suspenseWrapper(<NotFound />),
    element: (
      <AuthRoute>
        {suspenseWrapper(<DashBoard />)}
      </AuthRoute>
    ),
    children: [
      {
        path: 'quiz',
        element: suspenseWrapper(<Quiz />),
      },
      {
        path: 'trash-bin',
        element: suspenseWrapper(<TrashBin />),
      },
      {
        path: 'help',
        element: suspenseWrapper(<Help />),
      },
    ]
  },
  {
    path: 'login',
    element: suspenseWrapper(<Login />),
  },
  {
    path: 'quiz-session/:sessionId/admin',
    element: suspenseWrapper(<AdminLobby />),
  },
  {
    path: 'quiz-session/:sessionId/player',
    element: suspenseWrapper(<PlayerLobby />),
  },
  {
    path: 'join',
    element: suspenseWrapper(<PlayerJoin />),
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