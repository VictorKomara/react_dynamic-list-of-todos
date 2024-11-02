/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

const initialTodo: Todo = {
  userId: 0,
  id: 0,
  title: '0',
  completed: false,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo>(initialTodo);

  function getAllTodos() {
    getTodos().then(setTodos);
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              <Loader />
              <TodoList
                todos={todos}
                setShowModal={setShowModal}
                setTodo={setTodo}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          showModal={showModal}
          setShowModal={setShowModal}
          todo={todo}
        />
      )}
    </>
  );
};
