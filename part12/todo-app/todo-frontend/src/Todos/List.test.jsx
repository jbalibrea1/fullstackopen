import '@testing-library/jest-dom'; // Esto habilita los matchers de jest-dom
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoList from './List';

describe('TodoList', () => {
  it('renders todos and handles actions', () => {
    const todos = [
      { text: 'Hello', done: false },
      { text: 'World', done: false }
    ];

    const deleteTodoMock = vi.fn();
    const completeTodoMock = vi.fn();

    render(
      <TodoList
        todos={todos}
        deleteTodo={deleteTodoMock}
        completeTodo={completeTodoMock}
      />
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Set as done')[0]);
    expect(completeTodoMock).toHaveBeenCalledTimes(1);
    expect(completeTodoMock).toHaveBeenCalledWith(todos[0]);

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(deleteTodoMock).toHaveBeenCalledTimes(1);
    expect(deleteTodoMock).toHaveBeenCalledWith(todos[0]);
  });
});
