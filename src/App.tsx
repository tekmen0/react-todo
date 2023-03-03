import * as React from 'react';
import { render } from 'react-dom';
import ToDoForm from './components/todo-form';
import ToDoList from './components/todo-list';

import { type TodoItemInterface } from './interfaces';

// import logo from './logo.svg'
import './style.css';

const App: React.FC = () => {
	const [todos, setTodos] = React.useState<TodoItemInterface[]>([]);

	// tekmen
	React.useEffect(() => {
		// Update the document title using the browser API
		console.log(todos);
	});

	// Creating new todo item
	function handleTodoCreate(todo: TodoItemInterface) {
		const newTodosState: TodoItemInterface[] = [...todos];
		newTodosState.push(todo);
		setTodos(newTodosState);
	}
	// Update existing todo item
	function handleTodoUpdate(
		event: React.ChangeEvent<HTMLInputElement>,
		id: string
	) {
		const newTodosState: TodoItemInterface[] = [...todos];

		newTodosState.find((todo: TodoItemInterface) => todo.id === id)!.name =
			event.target.value;

		setTodos(newTodosState);
	}
	// Remove existing todo item
	function handleTodoRemove(id: string) {
		const newTodosState: TodoItemInterface[] = todos.filter(
			(todo: TodoItemInterface) => todo.id !== id
		);

		setTodos(newTodosState);
	}
	// Check existing todo item as completed
	function handleTodoComplete(id: string) {
		const newTodosState: TodoItemInterface[] = [...todos];
		// Find the correct todo item and update its ‘isCompleted’ key
		newTodosState.find((todo: TodoItemInterface) => todo.id === id)!.isCompleted =
			!newTodosState.find((todo: TodoItemInterface) => todo.id === id)!
				.isCompleted;
		setTodos(newTodosState);
	}
	return (
		<div className="App">
			<React.Fragment>
				<h2>My ToDo APP</h2>
				<ToDoForm todos={todos} handleTodoCreate={handleTodoCreate} />
				<ToDoList
					todos={todos}
					handleTodoUpdate={handleTodoUpdate}
					handleTodoRemove={handleTodoRemove}
					handleTodoComplete={handleTodoComplete}
				/>
			</React.Fragment>
		</div>
	);
};
export default App;
