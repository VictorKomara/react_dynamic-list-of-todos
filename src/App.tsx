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

let allTodos: Todo[] = [];

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo>(initialTodo);
  const [loading, setLoading] = useState(true);
  const [iconEyeId, setIconEyeId] = useState(0);

  function getAllTodos() {
    getTodos()
      .then(resultTodos => {
        allTodos = resultTodos;
        setTodos(resultTodos);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    getAllTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter allTodos={allTodos} setTodos={setTodos} />
            </div>

            <div className="block">
              {loading && <Loader />}

              {!loading && (
                <TodoList
                  todos={todos}
                  setShowModal={setShowModal}
                  setTodo={setTodo}
                  iconEyeId={iconEyeId}
                  setIconEyeId={setIconEyeId}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal
          showModal={showModal}
          setShowModal={setShowModal}
          todo={todo}
          setIconEyeId={setIconEyeId}
        />
      )}
    </>
  );
};
