import * as React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Link from 'react-bootstrap/Button';

import axios from 'axios';

const ToDoForm = dynamic(() => import('../src/components/todo-form'), {
	ssr: false,
});
import ToDoList from '../src/components/todo-list';
import { type TodoItemInterface } from '../src/interfaces';

const App: React.FC = () => {
	const accessKey = `2d6afa2475c20bacc7f5fbb4c19c47a89e8d1cea`;
	const [todos, setTodos] = React.useState<TodoItemInterface[]>([]);

	const router = useRouter();

	React.useEffect(() => {
		// Update the document title using the browser API
		axios
			.get('https://todo.crudful.com/tasks', {
				headers: {
					cfAccessKey: accessKey,
				},
			})
			.then(res => {
				let results: TodoItemInterface[] = res.data.results.map(todo => {
					return {
						id: todo.id,
						name: todo.title,
						isCompleted: todo.isCompleted,
					};
				});

				setTodos(results);
			});
	});

	// Creating new todo item
	async function handleTodoCreate(todo: TodoItemInterface) {
		//const newTodosState: TodoItemInterface[] = [...todos];
		//newTodosState.push(todo);
		//setTodos(newTodosState);
		await axios.post(
			'https://todo.crudful.com/tasks',
			JSON.stringify({ title: todo.name, isCompleted: false }),
			{
				headers: {
					cfAccessKey: accessKey,
					'Content-Type': 'application/json',
				},
			}
		);
	}
	// Update existing todo item
	function handleTodoUpdate(
		event: React.ChangeEvent<HTMLInputElement>,
		id: string
	) {
		console.log('handle todo update for ', id);
		const newTodosState: TodoItemInterface[] = [...todos];

		newTodosState.find((todo: TodoItemInterface) => todo.id === id)!.name =
			event.target.value;

		setTodos(newTodosState);
	}

	async function handleTodoSave(id: string) {
		await axios.patch(
			`https://todo.crudful.com/tasks/${id}`,
			JSON.stringify({
				title: todos.find((todo: TodoItemInterface) => todo.id === id)!.name,
			}),
			{
				headers: {
					cfAccessKey: accessKey,
					'Content-Type': 'application/json',
				},
			}
		);
	}
	// Remove existing todo item
	async function handleTodoRemove(id: string) {
		await axios.delete(`https://todo.crudful.com/tasks/${id}`, {
			headers: {
				cfAccessKey: accessKey,
			},
		});
	}
	// Check existing todo item as completed
	async function handleTodoComplete(id: string) {
		await axios.patch(
			`https://todo.crudful.com/tasks/${id}`,
			JSON.stringify({
				isCompleted: !todos.find((todo: TodoItemInterface) => todo.id === id)!
					.isCompleted,
			}),
			{
				headers: {
					cfAccessKey: accessKey,
					'Content-Type': 'application/json',
				},
			}
		);
	}
	return (
		<div className="App">
			<React.Fragment>
				<h2>ToDo APP </h2>
				<Link href="/create">Add</Link>
				{/*<ToDoForm todos={todos} handleTodoCreate={handleTodoCreate} />*/}
				<ToDoList
					todos={todos}
					handleTodoUpdate={handleTodoUpdate}
					handleTodoSave={handleTodoSave}
					handleTodoRemove={handleTodoRemove}
					handleTodoComplete={handleTodoComplete}
				/>
				{router.pathname === '/create' ? (
					<ToDoForm todos={todos} handleTodoCreate={handleTodoCreate} />
				) : null}
			</React.Fragment>
		</div>
	);
};
export default App;
