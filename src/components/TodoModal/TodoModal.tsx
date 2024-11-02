import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  showModal: boolean;
  setShowModal: (close: boolean) => void;
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({
  showModal,
  setShowModal,
  todo,
}) => {
  const [user, setUser] = useState<User>();

  function getCurrentUser() {
    getUser(todo.userId).then(setUser);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div
      className={cn('modal', {
        'is-active': showModal,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {false ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setShowModal(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
