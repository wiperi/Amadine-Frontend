import React, { useState } from 'react';
import { Button, Input, List } from 'antd';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = (): void => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Todo List</h1>
      <div>
        <Input
          value={newTodo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
          onPressEnter={addTodo}
          placeholder="Add a new todo"
          style={{ width: 300, marginRight: 10 }}
        />
        <Button onClick={addTodo} type="primary">Add</Button>
      </div>
      <List
        style={{ marginTop: 20, width: 400 }}
        bordered
        dataSource={todos}
        renderItem={(todo: Todo) => (
          <List.Item
            actions={[
              <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
            ]}
          >
            <div
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;