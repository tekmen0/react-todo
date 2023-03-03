import * as React from 'react';
import { type TodoItemInterface } from '../interfaces';

interface TodoItemProps {
	todo: TodoItemInterface;
	handleTodoUpdate: (
		event: React.ChangeEvent<HTMLInputElement>,
		id: string
	) => void;
	handleTodoSave: (id: string) => void;
	handleTodoComplete: (id: string) => void;
	handleTodoRemove: (id: string) => void;
}

// TodoItem component
const ToDoItem = (props: TodoItemProps) => {
	return (
		<div className="todo-item">
			<div
				onClick={() => {
					props.handleTodoComplete(props.todo.id);
				}}
			>
				{props.todo.isCompleted ? (
					<span className="todo-item-checked">✔</span>
				) : (
					<span className="todo-item-unchecked"> ✔</span>
				)}
			</div>
			<div
				onClick={() => {
					props.handleTodoSave(props.todo.id);
				}}
			>
				<span className="item-save">💾</span>
			</div>
			<div className="todo-item-input-wrapper">
				<input
					value={props.todo.name}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						props.handleTodoUpdate(event, props.todo.id)
					}
				/>
			</div>
			<div
				className="item-remove"
				onClick={() => props.handleTodoRemove(props.todo.id)}
			>
				<span className="item-remove-unchecked">⨯</span>
			</div>
		</div>
	);
};
export default ToDoItem;
