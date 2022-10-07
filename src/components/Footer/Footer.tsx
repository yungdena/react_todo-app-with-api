import { useCallback } from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  filter: string;
  changeFilter: (filterType: Filter) => void;
  todos: Todo[];
  removeTodo: (id: number) => void;
};

export const Footer: React.FC<Props> = ({
  filter,
  changeFilter,
  todos,
  removeTodo,
}) => {
  const removeCompletedTodos = useCallback(() => {
    todos.forEach((todo) => {
      if (todo.completed) {
        removeTodo(todo.id);
      }
    });
  }, [todos]);

  const countTodos = todos.filter((todo) => !todo.completed).length;
  const isCompleted = todos.filter((todo) => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${countTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: filter === Filter.All,
          })}
          onClick={() => changeFilter(Filter.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === Filter.Active,
          })}
          onClick={() => changeFilter(Filter.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === Filter.Completed,
          })}
          onClick={() => changeFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={removeCompletedTodos}
      >
        {isCompleted > 0 && (
          'Clear completed'
        )}

      </button>
    </footer>
  );
};
