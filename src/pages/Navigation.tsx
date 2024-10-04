import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <div>
      <Link to="counter">Counter</Link>
      <Link to="comment">Comments</Link>
      <Link to="todoList">App</Link>
      <Outlet />
    </div>
  );
};

