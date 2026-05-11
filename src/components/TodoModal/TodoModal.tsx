import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { RootState } from '../../app/store';
import { clearCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import React, { useEffect, useState } from 'react';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentTodo?.userId) return;

    //setUser(null);
    setIsLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users/${currentTodo.userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .finally(() => setIsLoading(false));
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{currentTodo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(clearCurrentTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}
            {' by '}
            {isLoading ? (
              <Loader />
            ) : user ? (
              <a href={`mailto:${user.email}`}>{user.name}</a>
            ) : (
              'Unknown user'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
