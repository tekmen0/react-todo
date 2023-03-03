import * as React from 'react';
import TodoItem from './todo-item';
import { TodoItemInterface } from '../interfaces';

interface TodoListProps {
	handleTodoUpdate: (
		event: React.ChangeEvent<HTMLInputElement>,
		id: string
	) => void;
	handleTodoSave: (id: string) => void;
	handleTodoComplete: (id: string) => void;
	handleTodoRemove: (id: string) => void;
	todos: TodoItemInterface[];
}

//in ToDoList.tsx
const ToDoList = (props: TodoListProps) => {
	return (
		<div className="todo-list">
			<ul>
				{props.todos.map(todo => (
					<li key={todo.id}>
						<TodoItem
							todo={todo}
							handleTodoComplete={props.handleTodoComplete}
							handleTodoRemove={props.handleTodoRemove}
							handleTodoSave={props.handleTodoSave}
							handleTodoUpdate={props.handleTodoUpdate}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};
export default ToDoList;
