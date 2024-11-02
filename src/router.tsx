import TodoList from './pages/testPages/TodoList';
import { Navigation } from './pages/testPages/Navigation';
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import QuizSession from './pages/QuizSession.tsx/QuizSession';
import PlayerJoin from './pages/QuizSession.tsx/PlayerJoin';

const DashBoard = lazy(() => import('./pages/DashBoard'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));
const AuthRoute = lazy(() => import('./pages/AuthRoute'));
const Home = lazy(() => import('./pages/Home'));
const Quiz = lazy(() => import('./pages/Quiz'));
const TrashBin = lazy(() => import('./pages/TrashBin'));

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
        path: 'home',
        element: suspenseWrapper(<Home />),
      },
      {
        path: 'quiz',
        element: suspenseWrapper(<Quiz />),
      },
      {
        path: 'trash-bin',
        element: suspenseWrapper(<TrashBin />),
      },
      {
        path: 'about',
        element: suspenseWrapper(<div>About</div>),
      },
    ]
  },
  {
    path: 'login',
    element: suspenseWrapper(<Login />),
  },
  {
    path: 'quiz-session/:id',
    element: suspenseWrapper(<QuizSession />),
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